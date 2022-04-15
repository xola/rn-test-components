import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './SuccessInfoStyles';
import StyledText from './StyledText';
import PropTypes from 'prop-types';
import { CardIcon, FailedIcon, SuccessIcon } from '../../images/svg';

class SuccessInfo extends Component {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
    };

    render() {
        const { title, message, ...rest } = this.props;
        return (
            <View style={styles.container} {...rest}>
                <SuccessIcon />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
            </View>
        );
    }
}

export default SuccessInfo;
