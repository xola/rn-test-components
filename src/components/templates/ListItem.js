import React, { Component } from 'react';
import _ from 'lodash';
import { View, Image } from 'react-native';
import CustomIcon from '../common/CustomIcon';
import styles from './ListItemStyle';
import StyledText from '../common/StyledText';
import Currency from '../common/Currency';
import { connect } from 'react-redux';
import moment from 'moment';
import xolaApi from '../../api/xolaApi';
import orderUtil from '../../utils/OrderUtil';

class ListItem extends Component {
    render() {
        const { order, experiences, item } = this.props;
        if (!item.experience) {
            return null;
        }
        const experience = experiences[item.experience.id];
        if (!experience) {
            return null;
        }
        const priceSchemes = experience.priceSchemes;
        const { demographics } = item;
        let price = priceSchemes[0] && priceSchemes[0].price ? priceSchemes[0].price : null;
        const image =
            experience.medias && experience.medias[0]
                ? { uri: experience.medias[0].src }
                : { uri: xolaApi.xolaUrl(`api/experiences/${experience.id}/medias/default?size=medium`) };
        let arrival = moment(item.arrival);
        if (item.arrivalTime) {
            const time = item.arrivalTime.toString().padStart(3, '0');
            arrival = moment(`${item.arrival} ${time}`, 'YYYY-MM-DD Hmm');
        }
        const obfuscatedCustomerName = order.customerName.replace(/(\w\s.)(.*)/, '$1***');
        const obfuscatedCustomerEmail = order.customerEmail
            ? order.customerEmail.replace(/(^.{1,3})(.*)@(.{1,3})(.*)/, '$1***@$3**.***')
            : null;
        return (
            <View style={styles.item}>
                <Image source={image} style={styles.image} />
                <View style={styles.description}>
                    <StyledText styleNames={['h2', 'uppercase']} style={styles.name}>
                        {experience.name.trim()}
                    </StyledText>
                    <StyledText style={styles.price}>
                        <Currency>{price}</Currency>
                    </StyledText>
                    <StyledText style={styles.infoText}>
                        <CustomIcon size={14} name="calendar" /> {arrival.format('L')}
                    </StyledText>
                    {item.arrivalTime ? (
                        <StyledText style={styles.infoText}>
                            <CustomIcon size={14} name="time" /> {arrival.format('LT')}
                        </StyledText>
                    ) : null}
                    <StyledText style={styles.infoText}>
                        <CustomIcon size={14} name={'user'} /> {obfuscatedCustomerName}
                    </StyledText>
                    {obfuscatedCustomerEmail ? (
                        <StyledText style={styles.infoText}>
                            <CustomIcon size={14} name={'email'} /> {obfuscatedCustomerEmail}
                        </StyledText>
                    ) : null}
                </View>

                <View style={styles.demographicsContainer}>
                    <View style={styles.demographics}>
                        {_.map(demographics, demographic => {
                            const label = demographic.label
                                ? demographic.label
                                : orderUtil.getDemographicLabel(experience, demographic.demographic.id);
                            return demographic.quantity !== 0 ? (
                                <StyledText key={label}>
                                    <CustomIcon name={orderUtil.guessDemographicIcon(label)} /> {demographic.quantity}{' '}
                                    {label} &nbsp;
                                </StyledText>
                            ) : null;
                        })}
                    </View>
                </View>

                <View style={styles.button}>{this.props.actionButton}</View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences.collection,
});

export default connect(mapStateToProps)(ListItem);
