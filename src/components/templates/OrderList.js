import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
import OrderListItem from './OrderListItem';
import styles from './OrderListStyle';
import StyledText from '../common/StyledText';
import { connect } from 'react-redux';
import { dismissLatestError } from '../../actions/errorsActions';
import moment from 'moment';

class OrderList extends Component {
    componentWillUnmount() {
        this.props.dismissLatestError();
    }

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
                    <OrderListItem
                        key={experienceItem.item.id}
                        item={experienceItem.item}
                        order={experienceItem.order}
                        onClick={this.props.onCheckInItem}
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

const mapDispatchToProps = {
    dismissLatestError,
};

export default connect(
    null,
    mapDispatchToProps,
)(OrderList);
