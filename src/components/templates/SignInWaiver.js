import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import URI from 'urijs';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { getActiveItem, getActiveOrder } from '../../selectors/orderSelector';

class SignInWaiver extends Component {
    state = {
        canGoBack: false,
    };

    webview = React.createRef();

    componentDidMount() {
        this.onGoBack = this.webview.current.goBack;
    }

    render() {
        const { item, experiences, order } = this.props;
        var experience = null;
        var source = null;
        if (this.props.navigation.getParam('experience')) {
            experience = this.props.navigation.getParam('experience');
            source = new URI(experience.waiverPreference.url + '&experienceId=' + experience.id);
        } else {
            experience = experiences[item.experience.id];
            source = new URI(experience.waiverPreference.url);
            source.hash(`#?embedded=true&tag=${item.shortCode}&itemId=${item.id}&orderId=${order.id}`);
        }

        return (
            <Layout
                noPadding={true}
                header={<Header title={'Sign Waiver'} back={this.state.canGoBack ? this.onGoBack : 'Home'} />}
            >
                <WebView
                    ref={this.webview}
                    source={{ uri: source.toString() }}
                    onNavigationStateChange={navState => {
                        if (navState.url.includes(source.domain())) {
                            this.setState({ canGoBack: false });
                        } else {
                            this.setState({ canGoBack: navState.canGoBack });
                        }
                    }}
                />
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
