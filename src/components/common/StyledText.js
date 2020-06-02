import React from 'react';
import { Text } from 'react-native';
import styles from './StyledTextStyle';
import StyledComponent from './StyledComponent';

/**
 * Text component that accepts predetermined styles passed as array through styleNames prop
 * Examples of predetermined styles are 'h1', 'h2', 'uppercase', full list can be seen in StyledTextStyle file
 *
 */
class StyledText extends StyledComponent {
    state = {
        styles: styles,
        basicStyle: 'basicText',
    };

    render() {
        const { children } = this.props;
        return <Text style={this.getStyles()}>{children}</Text>;
    }
}

export default StyledText;
