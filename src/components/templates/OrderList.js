import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
import Layout from '../common/Layout';
import OrderListItem from './OrderListItem';
import Error409Modal from '../../modals/Error409Modal';
import styles from './OrderListStyle';
import StyledText from '../common/StyledText';
import { connect } from 'react-redux';
import { dismissLatestError } from '../../actions/errorsActions';
import moment from 'moment';

class OrderList extends Component {
    componentWillUnmount() {
        this.props.dismissLatestError();
    }

    handleError = async () => {
        this.props.dismissLatestError();
    }

    render() {
        const { orders } = this.props;
        let experienceItems = [];

        _.forEach(orders, order => {
            _.forEach(order.items, item => {
                experienceItems.push({ item, order });
            });
        });

        experienceItems = _.orderBy(experienceItems, ['item.arrival', 'item.arrivalTime', 'order.customerName'], ['asc', 'asc', 'asc']);

        return _.size(experienceItems) ? (
            <Layout
                modals={<Error409Modal
                    toggle={this.props.latestError?.error === 'Request failed with status code 409'}
                    onClose={this.handleError}
                    title="Already Checked In"
                    body="This party has already been checked in"
                    buttonTitle="Close"
                />}
            >
                <ScrollView contentContainerStyle={styles.list}>
                    <View style={styles.header}>
                        <StyledText style={styles.headerTitle} styleNames={['h1']}>
                            Please Select Your Reservation
                        </StyledText>
                    </View>
                    {_.map(experienceItems, experienceItem => (
                        <OrderListItem
                            key={experienceItem.item.id}
                            item={experienceItem.item}
                            order={experienceItem.order}
                            onClick={this.props.onCheckInItem}
                        />
                    ))}
                </ScrollView>
            </Layout>
        ) : (
            <View style={styles.noResult}>
                <StyledText styleNames={['h2']}>No Results Found</StyledText>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    latestError: state.errors[state.errors.length - 1],
});

const mapDispatchToProps = {
    dismissLatestError,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderList);
