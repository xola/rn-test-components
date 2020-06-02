import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import styles from './ProgressBarStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';

/**
 * Progress step bar, shown in header
 */
class ProgressBar extends Component {
    static propTypes = {
        /**
         * current active step number
         */
        step: PropTypes.number,
        /**
         * array of names of steps, in order they should go through
         */
        steps: PropTypes.arrayOf(PropTypes.string),
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    {_.map(this.props.steps, (step, key) =>
                        key < this.props.step ? (
                            <View key={key} style={styles.stepContainer}>
                                {key !== 0 ? <View style={styles.activeProgressStep} /> : null}
                                <View style={styles.activeStepIndicator} />
                            </View>
                        ) : (
                            <View key={key} style={styles.stepContainer}>
                                <View style={styles.progressStep} />
                                <View style={styles.stepIndicator} />
                            </View>
                        ),
                    )}
                </View>

                <View style={styles.steps}>
                    {_.map(this.props.steps, (step, key) =>
                        key < this.props.step ? (
                            <StyledText key={key} style={styles.activeStep}>
                                {step}
                            </StyledText>
                        ) : (
                            <StyledText key={key} style={styles.step}>
                                {step}
                            </StyledText>
                        ),
                    )}
                </View>
            </View>
        );
    }
}

export default ProgressBar;
