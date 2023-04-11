import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './LoadingButtonStyle';
import StyledText from './StyledText';
import StyledComponent from './StyledComponent';
import PropTypes from 'prop-types';

/**
 * Button component that accepts predetermined styles passed as array through styleNames prop
 * Examples of predetermined styles are 'small', 'medium', 'success', full list can be seen inLoadingButtonStyle file
 */
class LoadingButton extends StyledComponent {
    static propTypes = {
        /**
         * boolean that determines whether spinning loader icon should be shown on a button
         */
        isLoading: PropTypes.bool,
        /**
         * Text shown inside the button
         */
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    };

    state = {
        styles: styles,
        basicStyle: 'loadingButton',
    };

    render() {
        const { isLoading, title, ...rest } = this.props;
        return (
            <TouchableOpacity {...rest} style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator color="#ffff" style={this.getStyles()} />
                ) : (
                    <StyledText style={this.getStyles()}>{title}</StyledText>
                )}
            </TouchableOpacity>
        );
    }
}

export default LoadingButton;
