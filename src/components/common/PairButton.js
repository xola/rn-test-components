import React from 'react';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import styles from './LoadingButtonStyle';
import StyledComponent from './StyledComponent';
import PropTypes from 'prop-types';
import { PairIcon, UnPairIcon } from '../../images/svg';
import variables from '../../styles/variables';

/**
 * Button component that accepts predetermined styles passed as array through styleNames prop
 * Examples of predetermined styles are 'small', 'medium', 'success', full list can be seen inLoadingButtonStyle file
 */
class PairButton extends StyledComponent {
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

    render() {
        const { isLoading, hasIcon, isPaired, title, ...rest } = this.props;
        return (
            <TouchableOpacity {...rest} style={styles.pairButton}>
                {isLoading ? (
                    <ActivityIndicator color={variables.blue} />
                ) : (
                    <View style={styles.row}>
                        {hasIcon && (isPaired ? <UnPairIcon /> : <PairIcon />)}
                        <Text style={styles.pairName}>{title}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

export default PairButton;
