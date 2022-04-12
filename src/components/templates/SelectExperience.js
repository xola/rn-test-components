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
import styles from '../common/HeaderStyle'
import variables from '../../styles/variables';

class SelectExperience extends Component {
    state = {
        selectedExperience: null
    }

    onSelectExperience = experience => {
        if (this.props.route.params?.selectExperienceForSigningWaiver) {
            NavigationService.navigate('SignInWaiver', { experience: experience });
        } else {
            if (this.state.selectedExperience === experience.id) {
                this.setState({ selectedExperience: null })
            } else {
                this.setState({ selectedExperience: experience.id })
            }
        }
    };

    handleNext = () => {
        this.props.selectExperience(this.state.selectedExperience);
        NavigationService.navigate('ExperienceAvailability');
    }

    render() {
        const { experiences } = this.props;
        const selectExperienceForSigningWaiver = this.props.route.params?.selectExperienceForSigningWaiver;
        const visibleExperiences = [];
        _.map(experiences, function (experience, key) {
            if (experience.visible) {
                visibleExperiences.push(experience);
            }
            return experience.visible;
        });
        if (selectExperienceForSigningWaiver) {
            return (
                <>
                    <Header back={true} steps={["Product", "Time", "Quantity", "Info", "Pay"]} currentStep={1} />
                    <Layout>
                        <ExperiencesList onSelectExperience={this.onSelectExperience} experiences={visibleExperiences} />
                    </Layout>
                </>
            );
        } else {
            return (
                <>
                    <Header
                        back={true}
                        right={() => this.state.selectedExperience ? <TouchableOpacity onPress={() => this.handleNext()} style={[styles.next, { backgroundColor: !this.state.selectedExperience ? variables.lightGrey : variables.mainBlue }]}>
                            <Text style={styles.nextText}>Next</Text>
                            <NextIcon />
                        </TouchableOpacity> : <View />}
                        steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                        currentStep={1}
                    />
                    <Layout>
                        <ExperiencesList selectedExperience={this.state.selectedExperience} onSelectExperience={this.onSelectExperience} experiences={visibleExperiences} />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectExperience);
