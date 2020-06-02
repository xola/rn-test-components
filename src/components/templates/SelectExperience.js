import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import ExperiencesList from './ExperiencesList';
import { selectExperience } from '../../actions/experiencesActions';
import Header from '../common/Header';
import NavigationService from '../NavigationService';

class SelectExperience extends Component {
    onSelectExperience = experience => {
        this.props.selectExperience(experience.id);
        NavigationService.navigate('ExperienceAvailability');
    };

    render() {
        const { experiences } = this.props;

        return (
            <Layout header={<Header currentStep={1} title={'Select Activity'} back={'Home'} />}>
                <ExperiencesList onSelectExperience={this.onSelectExperience} experiences={experiences} />
            </Layout>
        );
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
