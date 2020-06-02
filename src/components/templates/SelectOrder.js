import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import { checkInItem, selectOrderItem } from '../../actions/orderActions';
import Header from '../common/Header';
import OrderList from './OrderList';
import { selectExperience } from '../../actions/experiencesActions';

class SelectOrder extends Component {
    handleCheckInItem = (order, item) => {
        this.props.selectExperience(item.experience.id);
        this.props.selectOrderItem(order.id, item.id);
        this.props.checkInItem(order, item);
    };

    render() {
        const { orders } = this.props;
        return (
            <Layout header={<Header title={'Select Order'} back={'SearchOrders'} />}>
                <OrderList onCheckInItem={this.handleCheckInItem} orders={orders} />
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.collection,
});

const mapDispatchToProps = {
    checkInItem,
    selectExperience,
    selectOrderItem,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectOrder);
