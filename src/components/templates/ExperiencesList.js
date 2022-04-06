import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExperiencesListItem from './ExperiencesListItem';
import _ from 'lodash';
import styles from './ExperienceListStyle';

class ExperiencesList extends Component {
    render() {
        const { experiences, selectedExperience } = this.props;

        return (
            <ScrollView contentContainerStyle={styles.list}>
                {_.map(experiences, experience => (
                    <ExperiencesListItem
                        key={experience.id}
                        experience={experience}
                        selectedExperience={selectedExperience}
                        onClick={this.props.onSelectExperience}
                    />
                ))}
            </ScrollView>
        );
    }
}

export default ExperiencesList;
