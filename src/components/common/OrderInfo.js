import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import styles from './OrderInfoStyle';
import CustomIcon from './CustomIcon';
import orderUtil from '../../utils/OrderUtil';
import StyledText from './StyledText';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CalendarIcon, TimeIcon } from '../../images/svg';
import { w } from '../../utils/Scale';
import DemoGraphicIcon from './DemographicIcon';

/**
 * Component that shows information about order, experience, customer and payment info.
 */
class OrderInfo extends Component {
    static propTypes = {
        experience: PropTypes.object,
        cart: PropTypes.object,
    };

    render() {
        const { style } = this.props;
        const { name } = this.props.experience;
        const { arrival, arrivalTime, demographics, arrivalDatetime } = this.props.item;
        let arrivalDate;

        if (arrivalDatetime) {
            arrivalDate = moment(arrivalDatetime);
        } else {
            arrivalDate = moment(arrival);
            if (arrivalTime) {
                const time = arrivalTime.toString().padStart(3, '0');
                arrivalDate = moment(`${arrival} ${time}`, 'YYYY-MM-DD Hmm');
            }
        }

        return (
            <View style={[styles.info, style]}>
                <StyledText style={styles.name}>{name}</StyledText>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <CalendarIcon />
                        <StyledText style={styles.infoText}>
                            {arrivalDate.format('dddd, MMMM D YYYY')}
                        </StyledText>
                    </View>

                    {arrivalTime || arrivalDatetime ? (
                        <View style={[styles.row, { paddingLeft: w(20) }]}>
                            <TimeIcon />
                            <StyledText style={styles.infoText}>
                                {arrivalDate.format('LT')}
                            </StyledText>
                        </View>

                    ) : null}
                </View>
                <View style={styles.row}>
                    {_.map(demographics, demographic => {
                        const label = demographic.label
                            ? demographic.label
                            : orderUtil.getDemographicLabel(this.props.experience, demographic.demographic.id);
                        return demographic.quantity !== 0 ? (
                            <View style={[styles.row, { paddingRight: w(20) }]}>
                                <DemoGraphicIcon name={label} />
                                <StyledText key={demographic.label} style={styles.infoText}>
                                    {demographic.quantity} {label}
                                </StyledText>
                            </View>
                        ) : null;
                    })}
                </View>
            </View>
        );
    }
}

export default OrderInfo;
