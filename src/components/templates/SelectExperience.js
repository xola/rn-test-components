import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import ExperiencesList from './ExperiencesList';
import { selectExperience } from '../../actions/experiencesActions';
import Header from '../common/Header';
import NavigationService from '../NavigationService';
import _ from 'lodash';

class SelectExperience extends Component {
    onSelectExperience = experience => {
        if (this.props.navigation.getParam('selectExperienceForSigningWaiver')) {
            NavigationService.navigate('SignInWaiver', { experience: experience });
        } else {
            this.props.selectExperience(experience.id);
            NavigationService.navigate('ExperienceAvailability');
        }
    };

    render() {
        const { experiences } = this.props;
        
        const selectExperienceForSigningWaiver = this.props.navigation.getParam('selectExperienceForSigningWaiver');
        const visibleExperiences = []; 
        _.map(experiences, function(experience, key) {
            if (experience.visible) {
                visibleExperiences.push(experience);
            }
            return experience.visible;
          });
        console.log("manoj");
        console.log(visibleExperiences);
        if (selectExperienceForSigningWaiver) {
            return (
                <Layout header={<Header title={'Which activity are you attending?'} back={'Home'} />}>
                    <ExperiencesList onSelectExperience={this.onSelectExperience} experiences={visibleExperiences} />
                </Layout>
            );
        } else {
            return (
                <Layout header={<Header currentStep={1} title={'Select Activity'} back={'Home'} />}>
                    <ExperiencesList onSelectExperience={this.onSelectExperience} experiences={visibleExperiences} />
                </Layout>
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
