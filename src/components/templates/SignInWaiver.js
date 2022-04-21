import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import URI from 'urijs';
import { connect } from 'react-redux';
import Header from '../common/Header';
import { getActiveItem, getActiveOrder } from '../../selectors/orderSelector';
import StyledText from '../common/StyledText';
import { StyleSheet, View } from 'react-native';
import NavigationService from '../NavigationService';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 34,
        marginTop: 40,
        marginBottom: 20,
    },
    top: {
        backgroundColor: variables.white,
        paddingHorizontal: 60,
    }
});

class SignInWaiver extends Component {
    state = {
        canGoBack: false,
    };

    webview = React.createRef();

    componentDidMount() {
        this.onGoBack = this.webview.current.goBack;
    }

    handleSign = () => {
        NavigationService.navigate('SuccessPage', { waiverSigned: true });
    };

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
                <Header
                    back={true}
                    steps={[
                        'Search',
                        `Select ${this.props.route.params?.experience ? 'Product' : 'Reservation'}`,
                        'Sign Waiver',
                    ]}
                    currentStep={3}
                />

                <View style={styles.top}>
                    <StyledText style={styles.title} styleNames={['h1']}>
                        Sign Waiver
                    </StyledText>
                </View>

                <WebView
                    ref={this.webview}
                    source={{ uri: source.toString() }}
                    onNavigationStateChange={navState => {
                        if (navState.url.includes('thank-you')) {
                            this.handleSign()
                        }
                        if (navState.url.includes(source.domain())) {
                            this.setState({ canGoBack: false });
                        } else {
                            this.setState({ canGoBack: navState.canGoBack });
                        }

                    }}
                />
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
