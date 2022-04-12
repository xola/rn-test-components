import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import WaiverExperienceListItem from './WaiverExperienceListItem';
import styles from './WaiverExperienceListStyle';
import StyledText from '../common/StyledText';
import LoadingButton from '../common/LoadingButton';
import NavigationService from '../NavigationService';

class WaiverExperienceList extends Component {
    handleNoBookingDetails() {
        NavigationService.navigate('SelectExperience', {
            selectExperienceForSigningWaiver: true,
        });
    }

    render() {
        const { orders, selectedWaiver, onSelectWaiver } = this.props;
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
                <View style={styles.header}>
                    <StyledText style={styles.headerTitle} styleNames={['h1']}>
                        Please Select Your Reservation
                    </StyledText>
                    <View>
                        <LoadingButton
                            onPress={this.handleNoBookingDetails}
                            styleNames={['large', 'neutral', 'wide']}
                            title="Can’t find your reservation?"
                            style={{
                                borderColor: '#E0E3E7',
                                fontWeight: '700',
                                fontSize: 22,
                            }}
                        />
                    </View>
                </View>
                {_.map(experienceItems, experienceItem => (
                    <WaiverExperienceListItem
                        key={experienceItem.item.id}
                        item={experienceItem.item}
                        order={experienceItem.order}
                        onClick={onSelectWaiver}
                        selectedWaiver={selectedWaiver}
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
