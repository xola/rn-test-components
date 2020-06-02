import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import NavigationService from '../NavigationService';
import { View, TouchableOpacity } from 'react-native';
import styles from './HeaderStyle';
import CustomIcon from './CustomIcon';
import StyledText from './StyledText';
import PropTypes from 'prop-types';

export const PROGRESS_STEPS = ['Activity', 'Date & Time', 'Information', 'Payment'];

/**
 * Header component used in most pages.
 */
class Header extends Component {
    static propTypes = {
        /**
         *  Name of navigation screen back button leads to
         */
        back: PropTypes.string,
        /**
         * Title of the current page
         */
        title: PropTypes.string,
        /**
         * Current step of the checkout process
         */
        currentStep: PropTypes.number,
        /**
         * Element shown on the right side (usually a button)
         */
        right: PropTypes.object,
    };

    handleBackClick = () => {
        NavigationService.navigate(this.props.back);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.back}>
                    {this.props.back ? (
                        <TouchableOpacity onPress={this.handleBackClick}>
                            <CustomIcon style={styles.backIcon} size={36} name="arrow-left" />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <View style={styles.steps}>
                    {this.props.title ? (
                        <StyledText styleNames={['h1']} style={styles.title}>
                            {this.props.title}
                        </StyledText>
                    ) : null}

                    {this.props.currentStep ? (
                        <ProgressBar steps={PROGRESS_STEPS} step={this.props.currentStep} />
                    ) : null}
                </View>

                <View style={styles.forward}>{this.props.right}</View>
            </View>
        );
    }
}

export default Header;
