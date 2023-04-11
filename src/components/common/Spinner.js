import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './SpinnerStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';
import CustomIcon from './CustomIcon';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * Spinner button, used to handle integer values such as number of demographics and addOns
 * Shown as a current value between '-' and '+' buttons
 */
class Spinner extends Component {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.number,
        max: PropTypes.number,
        min: PropTypes.number,
        onChange: PropTypes.func,
        addOnValue: PropTypes.func,
    };

    state = {
        showError: false,
        message: null,
    };

    handleIncrementClick = () => {
        const { id, value, max, onChange } = this.props;
        const nextValue = value + 1;

        if (max && nextValue > max) {
            this.setState({ showError: true, message: `Can't book above ${max}` });
        } else {
            onChange(id, nextValue);
            this.setState({ showError: false, message: null });
        }
    };

    handleDecrementClick = () => {
        const { id, value, min, onChange } = this.props;
        const nextValue = value - 1;

        if (nextValue < min) {
            if (min > 0) {
                // Only show an error if min is greater than zero. Warnings for negative values dont make sense
                this.setState({ showError: true, message: `Can't book below ${min}` });
            }
        } else {
            onChange(id, nextValue);
            this.setState({ showError: false, message: null });
        }
    };

    render() {
        const { value } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.handleDecrementClick} style={styles.button}>
                    <Icon name="minus" style={styles.buttonText} />
                </TouchableOpacity>

                {!this.props.addOnValue ? <StyledText styleNames={['h2']} style={styles.value}>
                    {value}
                </StyledText> : this.props.addOnValue()}

                <TouchableOpacity onPress={this.handleIncrementClick} style={styles.button}>
                    <Icon name="plus" style={styles.buttonText} />
                </TouchableOpacity>

                {this.state.showError ? (
                    <View style={styles.danger}>
                        <StyledText>{this.state.message}</StyledText>
                    </View>
                ) : null}
            </View>
        );
    }
}

export default Spinner;
