import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import URI from 'urijs';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { getActiveItem, getActiveOrder } from '../../selectors/orderSelector';

class SignInWaiver extends Component {
    render() {
        const { item, experiences, order } = this.props;
        const experience = experiences[item.experience.id];
        const source = new URI(experience.waiverPreference.url);
        source.hash(`#?embedded=true&tag=${item.shortCode}&itemId=${item.id}&orderId=${order.id}`);

        return (
            <Layout noPadding={true} header={<Header title={'Sign Waiver'} home={true} />}>
                <WebView source={{ uri: source.toString() }} />
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    item: getActiveItem(state),
    order: getActiveOrder(state),
    experiences: state.experiences.collection,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInWaiver);
