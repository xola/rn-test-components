import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import URI from 'urijs';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { getActiveItem, getActiveOrder } from '../../selectors/orderSelector';
import StyledText from '../common/StyledText';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 34,
        marginTop: 20,
        marginBottom: 15,
    },
});

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
        if (this.props.route.params?.experience) {
            experience = this.props.route.params?.experience;
            source = new URI(experience.waiverPreference.url);
            source.hash(`#?embedded=true&experienceId=${experience.id}`);
        } else {
            experience = experiences[item.experience.id];
            source = new URI(experience.waiverPreference.url);
            source.hash(`#?embedded=true&tag=${item.shortCode}&itemId=${item.id}&orderId=${order.id}`);
        }

        return (
            <>
                <Header back={true} steps={['Search', 'Select Reservation', 'Sign Waiver']} currentStep={3} />
                <Layout noPadding={true}>
                    <StyledText style={styles.title} styleNames={['h1']}>
                        Sign Waiver
                    </StyledText>
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
            </>
        );
    }
}

const mapStateToProps = state => ({
    item: getActiveItem(state),
    order: getActiveOrder(state),
    experiences: state.experiences.collection,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignInWaiver);
