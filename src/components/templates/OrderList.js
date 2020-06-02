import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
import OrderListItem from './OrderListItem';
import styles from './OrderListStyle';
import StyledText from '../common/StyledText';
import { connect } from 'react-redux';
import { dismissLatestError } from '../../actions/errorsActions';

class OrderList extends Component {
    componentWillUnmount() {
        this.props.dismissLatestError();
    }

    render() {
        const { orders } = this.props;

        return _.size(orders) ? (
            <ScrollView contentContainerStyle={styles.list}>
                {_.map(orders, order => {
                    if (order.items) {
                        return _.map(order.items, item => (
                            <OrderListItem key={item.id} item={item} order={order} onClick={this.props.onCheckInItem} />
                        ));
                    }
                    return null;
                })}
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
