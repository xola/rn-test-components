import _ from 'lodash';
import React, { Component } from 'react';
import NavigationService from '../NavigationService';
import { View, FlatList, TouchableOpacity } from 'react-native';
import styles from './HeaderStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';
import variables from '../../styles/variables';
import { BackIcon, ConfirmedIcon } from '../../images/svg';

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

        /**
         * Param that determines whether home button should be shown
         */
        home: PropTypes.bool,
    };

    handleBackClick = () => {
        NavigationService.goBack()
    };

    getTextColor = (index) => {
        if (this.props.currentStep < (index + 1)) {
            return variables.darkGrey
        } else if (this.props.currentStep === (index + 1)) {
            return variables.mainBlue
        } else {
            return variables.green
        }
    }

    getBackgroundColor = (index) => {
        if (this.props.currentStep < (index + 1)) {
            return variables.grey
        } else if (this.props.currentStep === (index + 1)) {
            return variables.mainBlue
        } else {
            return variables.white
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.back && <TouchableOpacity onPress={this.handleBackClick} style={styles.back}>
                    <BackIcon />
                </TouchableOpacity>}

                <View style={styles.steps}>
                    <FlatList
                        data={this.props.steps}
                        extraData={this.props.steps}
                        renderItem={({ item, index }) =>
                            <View style={styles.step}>
                                {this.props.currentStep - 2 < (index) ? <View style={[styles.stepCount, { backgroundColor: this.getBackgroundColor(index) }]}>
                                    <StyledText style={[styles.stepText, { color: this.props.currentStep === (index + 1) ? variables.white : variables.darkGrey }]}>
                                        {index + 1}
                                    </StyledText>
                                </View> : <View style={[styles.stepCount, { backgroundColor: this.getBackgroundColor(index) }]}>
                                    <ConfirmedIcon />
                                </View>}
                                <StyledText style={[styles.stepText, { color: this.getTextColor(index) }]}>
                                    {item}
                                </StyledText>
                            </View>
                        }
                        ItemSeparatorComponent={
                            () => <View style={styles.separator} >
                                <View style={styles.separatorLine} />
                            </View>}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                </View>

                {this.props.right && <View style={styles.forward}>{this.props.right()}</View>}
            </View>
        );
    }
}

export default Header;
