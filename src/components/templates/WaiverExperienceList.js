import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import WaiverExperienceListItem from './WaiverExperienceListItem';
import styles from './WaiverExperienceListStyle';
import StyledText from '../common/StyledText';

class WaiverExperienceList extends Component {
    render() {
        const { orders } = this.props;
        let experienceItems = [];

        _.forEach(orders, order => {
            _.forEach(order.items, item => {
                if (moment(item.arrival).isSameOrAfter({}, 'day')) {
                    experienceItems.push({ item, order });
                }
            });
        });

        experienceItems = _.orderBy(experienceItems, ['item.arrival', 'order.customerName'], ['desc', 'asc']);
        return _.size(experienceItems) ? (
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
        ) : (
            <View style={styles.noResult}>
                <StyledText styleNames={['h2']}>No Results Found</StyledText>
            </View>
        );
    }
}

export default WaiverExperienceList;
