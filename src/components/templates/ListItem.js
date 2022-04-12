import React, { Component } from 'react';
import _ from 'lodash';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import CustomIcon from '../common/CustomIcon';
import styles from './ListItemStyle';
import StyledText from '../common/StyledText';
import { connect } from 'react-redux';
import moment from 'moment';
import xolaApi from '../../api/xolaApi';
import orderUtil from '../../utils/OrderUtil';
import variables from '../../styles/variables';
import { selectOrderItem } from '../../actions/orderActions';
import NavigationService from '../NavigationService';

class ListItem extends Component {
    handleSignWaiver = () => {
        this.props.selectOrderItem(this.props.order.id, this.props.item.id);
        NavigationService.navigate('SignInWaiver');
    };

    handleWaiverSelect = () => {
        this.props.onClick(this.props.experiences[this.props.item.experience.id]);
        !this.props.selectedWaiver && setTimeout(this.handleSignWaiver, 1000);
    };
    render() {
        const { order, experiences, item, selectedWaiver } = this.props;
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
        console.log('experience.waiverPreference: ', experience.waiverPreference);
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor: selectedWaiver === experience.id ? variables.lightBlue : variables.white,
                        borderColor: selectedWaiver === experience.id ? variables.mainBlue : variables.lightGrey,
                    },
                ]}
                onPress={this.handleWaiverSelect}
            >
                <Image source={image} style={styles.image} />

                <View style={styles.flex}>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.name}>{obfuscatedCustomerName}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>{experience.name.trim()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText style={styles.infoText}>
                                <CustomIcon size={14} name="calendar" /> {arrival.format('ddd, ll')}{' '}
                            </StyledText>
                            <StyledText style={[styles.infoText, { marginLeft: 10 }]}>
                                <CustomIcon size={14} name="time" /> {arrival.format('LT')}
                            </StyledText>
                        </View>
                        <View style={styles.demographicsContainer}>
                            <View style={styles.demographics}>
                                {_.map(demographics, demographic => {
                                    const label = demographic.label
                                        ? demographic.label
                                        : orderUtil.getDemographicLabel(experience, demographic.demographic.id);
                                    return demographic.quantity !== 0 ? (
                                        <StyledText key={label} style={{ color: '#505254' }}>
                                            <CustomIcon name={orderUtil.guessDemographicIcon(label)} />{' '}
                                            {demographic.quantity} {label} &nbsp;
                                        </StyledText>
                                    ) : null;
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences.collection,
});

const mapDispatchToProps = {
    selectOrderItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
