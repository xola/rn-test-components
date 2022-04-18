import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './TimeSlotStyle';

/**
 * A full-width button that shows formatted time on left side and available slots on other
 */
class DateSlot extends Component {
    selectTime = () => {
        this.props.handleClick(this.props.date);
    };

    render() {
        const { slots, date } = this.props;
        const openSlots = slots >= 99999 ? '∞' : slots;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.selectTime}>
                    <Text style={styles.time}>{date}</Text>
                    <Text style={styles.slots}>{openSlots} open</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default DateSlot;
