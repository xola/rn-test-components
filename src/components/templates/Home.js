import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import NavigationService from '../NavigationService';
import Layout from '../common/Layout';
import { authenticateUser } from '../../actions/authActions';
import { fetchExperiences } from '../../actions/experiencesActions';
import { discoverPrinters } from '../../actions/printerActions';
import LoadingButton from '../common/LoadingButton';
import styles from './HomeStyle';
import StyledText from '../common/StyledText';
import xolaApi from '../../api/xolaApi';
import { resetCart } from '../../actions/cartActions';
import { BackIcon } from '../../images/svg';
import Axios from 'axios';

class Home extends Component {
    state = {
        waiverEnabled: false,
        checkInEnabled: false
    }

    componentDidMount() {
        this.props.discoverPrinters();
        this.checkWaivers();
        this.checkPreferences();
    }

    handleBookNowClick = () => {
        this.props.resetCart();
        NavigationService.navigate('SelectExperience');
    };

    handleWaiversClick = () => {
        this.props.resetCart();
        NavigationService.navigate('SearchWaivers');
    };

    handleCheckInClick = () => {
        this.props.resetCart();
        NavigationService.navigate('SearchOrders');
    };

    checkWaivers = async () => {
        const { auth, seller } = this.props;
        try {
            const plugins = await Axios.get(xolaApi.pluginUrl('/plugins?abilities[has]=waiver'))
            const waiverPluginIds = plugins.data?.data.map(item => item.id)

            if (waiverPluginIds.length !== 0) {
                const installedPlugins = await Axios.get(xolaApi.pluginUrl(`/installations?seller=${seller.id}&id[in]=${waiverPluginIds}`), {
                    headers: { 'X-API-KEY': auth.apiKey },
                })

                if (installedPlugins.data?.data?.length !== 0) {
                    this.setState({
                        waiverEnabled: true
                    })
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    checkPreferences = () => {
        const { experiences, seller } = this.props
        const experienceCheckIn = Object.values(experiences.collection).some(item => item.checkPreferences === true)
        if (experienceCheckIn || seller.preferences?.checkIn) {
            this.setState({ checkInEnabled: true })
        }
    }

    render() {
        const { seller } = this.props;
        const logoUrl = xolaApi.xolaUrl(`/api/sellers/${seller.id}/logo?height=512&format=png`);

        return (
            <Layout noReset={true}>
                <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.back}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.container}>
                    {seller.isLoading ? (
                        <View>
                            <StyledText>Loading...</StyledText>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.logo}>
                                <Image style={styles.image} source={{ uri: logoUrl }} />
                            </View>
                            <View style={styles.actions}>
                                <View style={styles.buttons}>
                                    {this.props.connectedReader ? (
                                        <LoadingButton
                                            onPress={this.handleBookNowClick}
                                            styleNames={['large', 'active', 'narrow']}
                                            title="Book Now"
                                        />
                                    ) : null}

                                    {this.state.waiverEnabled ? (
                                        <LoadingButton
                                            onPress={this.handleWaiversClick}
                                            styleNames={['large', 'neutral', 'narrow']}
                                            title="Sign Waiver"
                                        />
                                    ) : null}

                                    {this.state.checkInEnabled ? <LoadingButton
                                        onPress={this.handleCheckInClick}
                                        styleNames={['large', 'neutral', 'narrow']}
                                        title="Check In"
                                    /> : null}
                                </View>
                            </View>
                        </View>

                    )}
                </View>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    seller: state.auth.seller,
    experiences: state.experiences,
    connectedReader: state.readers.connectedReader,
});

const mapDispatchToProps = {
    authenticateUser,
    fetchExperiences,
    resetCart,
    discoverPrinters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
