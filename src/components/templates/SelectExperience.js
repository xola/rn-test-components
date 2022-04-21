import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import ExperiencesList from './ExperiencesList';
import { selectExperience } from '../../actions/experiencesActions';
import Header from '../common/Header';
import NavigationService from '../NavigationService';
import _ from 'lodash';
import { NextIcon } from '../../images/svg';
import styles from '../common/HeaderStyle';
import variables from '../../styles/variables';
import titleStyles from './WaiverExperienceListStyle';
import StyledText from '../common/StyledText';

class SelectExperience extends Component {
    state = {
        selectedExperience: null,
    };

    onSelectExperience = experience => {
        if (this.state.selectedExperience === experience.id) {
            this.setState({ selectedExperience: null });
        } else {
            this.setState({ selectedExperience: experience.id });
        }
        if (this.props.route.params?.selectExperienceForSigningWaiver) {
            !this.state.selectedExperience &&
                setTimeout(() => NavigationService.navigate('SignInWaiver', { experience }), 1000);
        }
    };

    handleNext = () => {
        this.props.selectExperience(this.state.selectedExperience);
        NavigationService.navigate('ExperienceAvailability');
    };

    render() {
        const { experiences } = this.props;
        const selectExperienceForSigningWaiver = this.props.route.params?.selectExperienceForSigningWaiver;
        const visibleExperiences = [];

        if (selectExperienceForSigningWaiver) {
            _.map(experiences, function (experience, key) {
                if (experience.visible && experience.waiverPreference) {
                    visibleExperiences.push(experience);
                }
                return experience.visible;
            });
            return (
                <>
                    <Header back={true} steps={['Search', 'Select Product', 'Sign Waiver']} currentStep={2} />
                    <Layout>
                        <View style={titleStyles.header}>
                            <StyledText style={titleStyles.headerTitle} styleNames={['h1']}>
                                Which activity are you attending?
                            </StyledText>
                        </View>
                        <ExperiencesList
                            onSelectExperience={this.onSelectExperience}
                            experiences={visibleExperiences}
                            selectedExperience={this.state.selectedExperience}
                        />
                    </Layout>
                </>
            );
        } else {
            _.map(experiences, function (experience, key) {
                if (experience.visible) {
                    visibleExperiences.push(experience);
                }
                return experience.visible;
            });
            return (
                <>
                    <Header
                        back={true}
                        right={() =>
                            this.state.selectedExperience ? (
                                <TouchableOpacity
                                    onPress={() => this.handleNext()}
                                    style={[
                                        styles.next,
                                        {
                                            backgroundColor: !this.state.selectedExperience
                                                ? variables.lightGrey
                                                : variables.mainBlue,
                                        },
                                    ]}
                                >
                                    <Text style={styles.nextText}>Next</Text>
                                    <NextIcon />
                                </TouchableOpacity>
                            ) : (
                                <View />
                            )
                        }
                        steps={['Product', 'Time', 'Quantity', 'Info', 'Pay']}
                        currentStep={1}
                    />
                    <Layout>
                        <ExperiencesList
                            selectedExperience={this.state.selectedExperience}
                            onSelectExperience={this.onSelectExperience}
                            experiences={visibleExperiences}
                        />
                    </Layout>
                </>
            );
        }
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences.collection,
});

const mapDispatchToProps = {
    selectExperience,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectExperience);
