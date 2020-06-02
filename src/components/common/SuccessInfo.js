import React, { Component } from 'react';
import { View } from 'react-native';
import CustomIcon from './CustomIcon';
import styles from './SuccessInfoStyles';
import StyledText from './StyledText';
import PropTypes from 'prop-types';

class SuccessInfo extends Component {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
    };

    render() {
        const { title, message } = this.props;
        return (
            <View style={styles.container}>
                <CustomIcon style={styles.icon} size={25} name="tick-bold" />
                <StyledText styleNames={['h2']}>{title}</StyledText>
                <StyledText styleNames={['h3']}>{message}</StyledText>
            </View>
        );
    }
}

export default SuccessInfo;
