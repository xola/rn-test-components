import { View, TouchableOpacity, Picker, Text, Platform } from 'react-native';
import React, { Component, Children } from 'react';
import styles from './ClickablePickerStyle';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * Component that serves as a classic select box for multi-option inputs
 */
class ClickablePicker extends Component {
    static propTypes = {
        title: PropTypes.func,
        textSize: PropTypes.number,
        onValueChange: PropTypes.func,
    };

    state = {
        isOpened: false
    }

    handleValueChange = value => {
        this.props.onValueChange(value);
    };

    render() {
        const { children, value } = this.props;
        console.log(children, value)
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.container}>
                    <Picker selectedValue={value} onValueChange={this.handleValueChange}>
                        {children}
                    </Picker>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Picker selectedValue={value} onValueChange={this.handleValueChange}>
                        {children}
                    </Picker>
                </View>
            );
        }

    }
}

export default ClickablePicker;
