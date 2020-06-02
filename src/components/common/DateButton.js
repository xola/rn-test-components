import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './DateButtonStyle';
import StyledText from './StyledText';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * Button that shows formatted date, day and month name if explicitly determined via 'isFirst' prop or if the day is first in the month
 */
class DateButton extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        date: PropTypes.object,
        isFirst: PropTypes.bool,
        isSelected: PropTypes.bool,
    };

    handleSelectDate = () => {
        this.props.handleClick(this.props.date.format('YYYY-MM-DD'));
    };

    render() {
        const date = moment(this.props.date).clone();

        const formattedDate = {
            day: date.format('dddd'),
            date: date.format('D'),
            month: date.format('MMMM'),
            value: date.format('YYYY-MM-DD'),
        };

        const containerStyle = [styles.container];
        this.props.isSelected ? containerStyle.push(styles.selected) : containerStyle.push(styles.unselected);

        return (
            <View>
                <TouchableOpacity
                    onPress={this.handleSelectDate}
                    disabled={this.props.isSelected}
                    value={formattedDate.value}
                >
                    {this.props.isFirst || formattedDate.date === '1' ? (
                        <StyledText style={styles.month}>{formattedDate.month}</StyledText>
                    ) : (
                        <View style={styles.month} />
                    )}
                    <View style={containerStyle}>
                        <StyledText style={[styles.day, this.props.isSelected ? styles.selected : null]}>
                            {formattedDate.day}
                        </StyledText>

                        <StyledText style={[styles.date, this.props.isSelected ? styles.selected : null]}>
                            {formattedDate.date}
                        </StyledText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default DateButton;
