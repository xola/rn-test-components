import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './TimeSlotStyle';
import moment from 'moment';
import variables from '../../styles/variables';

/**
 * A full-width button that shows formatted time on left side and available slots on other
 */
class TimeSlot extends Component {
    selectTime = () => {
        this.props.handleClick(this.props.time);
    };

    render() {
        const { time, slots, selectedTime } = this.props;
        const formatedTime = time ? this.formatTime(time.toString()) : 'Anytime';
        const openSlots = slots >= 99999 ? '∞' : slots;

        return (
            <TouchableOpacity
                style={[
                    styles.container,
                    {
                        backgroundColor: selectedTime === time ? variables.lightBlue : variables.white,
                        borderColor: selectedTime === time ? variables.mainBlue : variables.lightGrey,
                    }]}
                onPress={this.selectTime}>
                <Text style={styles.time}>{formatedTime}</Text>
                <Text style={styles.slots}>{openSlots} open</Text>
            </TouchableOpacity>
        );
    }

    formatTime(time) {
        time = time.padStart(3, '0');
        return moment(time, 'Hmm').format('LT');
    }
}

export default TimeSlot;
