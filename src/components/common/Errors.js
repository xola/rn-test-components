import { dismissLatestError } from '../../actions/errorsActions';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LoadingButton from './LoadingButton';
import styles from './ErrorsStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';

class Errors extends Component {
    static propTypes = {
        latestError: PropTypes.object,
        dismissLatestError: PropTypes.func,
    };

    render() {
        const { latestError, dismissLatestError } = this.props;

        if (!latestError) {
            return null;
        }

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <StyledText style={styles.title}>{latestError.title}</StyledText>
                    <StyledText style={styles.error}>{latestError.error}</StyledText>
                    <LoadingButton title="Dismiss" onPress={dismissLatestError} styleNames={['cancel', 'medium']} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    latestError: state.errors[state.errors.length - 1],
});

const mapDispatchToProps = {
    dismissLatestError,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Errors);
