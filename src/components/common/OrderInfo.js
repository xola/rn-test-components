import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import styles from './OrderInfoStyle';
import CustomIcon from './CustomIcon';
import orderUtil from '../../utils/OrderUtil';
import StyledText from './StyledText';
import moment from 'moment';
import PropTypes from 'prop-types';

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
                <StyledText style={styles.infoText}>
                    <CustomIcon name="calendar" /> {arrivalDate.format('L')}
                </StyledText>
                {arrivalTime || arrivalDatetime ? (
                    <StyledText style={styles.infoText}>
                        <CustomIcon name="time" /> {arrivalDate.format('LT')}
                    </StyledText>
                ) : null}
                <StyledText style={styles.infoText}>
                    {_.map(demographics, demographic => {
                        const label = demographic.label
                            ? demographic.label
                            : orderUtil.getDemographicLabel(this.props.experience, demographic.demographic.id);
                        return demographic.quantity !== 0 ? (
                            <StyledText key={demographic.label}>
                                <CustomIcon name={orderUtil.guessDemographicIcon(label)} /> {demographic.quantity}{' '}
                                {label} &nbsp;
                            </StyledText>
                        ) : null;
                    })}
                </StyledText>
            </View>
        );
    }
}

export default OrderInfo;
