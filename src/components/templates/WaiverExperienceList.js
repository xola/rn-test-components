import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import _ from 'lodash';
import WaiverExperienceListItem from './WaiverExperienceListItem';
import styles from './WaiverExperienceListStyle';

class WaiverExperienceList extends Component {
    render() {
        const { orders } = this.props;
        const experienceItems = [];

        _.forEach(orders, order => {
            _.forEach(order.items, item => {
                experienceItems.push({ item, order });
            });
        });
        return (
            <ScrollView contentContainerStyle={styles.list}>
                {_.map(experienceItems, experienceItem => (
                    <WaiverExperienceListItem
                        key={experienceItem.item.id}
                        item={experienceItem.item}
                        order={experienceItem.order}
                        onClick={this.props.onSignWaiver}
                    />
                ))}
            </ScrollView>
        );
    }
}

export default WaiverExperienceList;
