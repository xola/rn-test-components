import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './IconButtonStyle';
import StyledComponent from './StyledComponent';
import PropTypes from 'prop-types';
import { SearchIcon } from '../../images/svg';

/**
 * Button component that accepts predetermined styles passed as array through styleNames prop
 * Examples of predetermined styles are 'small', 'medium', 'success', full list can be seen inLoadingButtonStyle file
 */
class IconButton extends StyledComponent {
    static propTypes = {
        /**
         * boolean that determines whether spinning loader icon should be shown on a button
         */
        isLoading: PropTypes.bool,
    };

    state = {
        styles: styles,
        basicStyle: 'loadingButton',
    };

    render() {
        const { isLoading, ...rest } = this.props;
        return (
            <TouchableOpacity {...rest} style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator color="#ffff" style={this.getStyles()} />
                ) : (
                    <SearchIcon style={styles.button} />
                )}
            </TouchableOpacity>
        );
    }
}

export default IconButton;
