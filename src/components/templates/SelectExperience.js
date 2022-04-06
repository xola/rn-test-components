import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import ExperiencesList from './ExperiencesList';
import { selectExperience } from '../../actions/experiencesActions';
import Header from '../common/Header';
import NavigationService from '../NavigationService';
import _ from 'lodash';
import { NextIcon } from '../../images/svg';
import styles from '../common/HeaderStyle'

class SelectExperience extends Component {
    onSelectExperience = experience => {
        if (this.props.route.params?.selectExperienceForSigningWaiver) {
            NavigationService.navigate('SignInWaiver', { experience: experience });
        } else {
            this.props.selectExperience(experience.id);
            NavigationService.navigate('ExperienceAvailability');
        }
    };

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
                        right={() => <TouchableOpacity onPress={() => { }} style={styles.next}>
                            <Text style={styles.nextText}>Next</Text>
                            <NextIcon />
                        </TouchableOpacity>}
                        steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                        currentStep={3}
                    />
                    <Layout>
                        <ExperiencesList onSelectExperience={this.onSelectExperience} experiences={visibleExperiences} />
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
