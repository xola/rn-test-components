import React, { Component } from 'react';
import { View, Image } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import NavigationService from '../NavigationService';
import Layout from '../common/Layout';
import { authenticateUser } from '../../actions/authActions';
import { fetchExperiences } from '../../actions/experiencesActions';
import LoadingButton from '../common/LoadingButton';
import styles from './HomeStyle';
import StyledText from '../common/StyledText';
import xolaApi from '../../api/xolaApi';
import { resetCart } from '../../actions/cartActions';

class Home extends Component {
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

    render() {
        const { seller } = this.props;
        const logoUrl = xolaApi.xolaUrl(`/api/sellers/${seller.id}/logo?height=512&format=png`);
        const hasWaivers = _.includes(seller.roles, 'ROLE_WAIVER');

        return (
            <Layout noReset={true}>
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
                                            styleNames={['large', 'success', 'narrow']}
                                            title="Book Now"
                                        />
                                    ) : null}

                                    {hasWaivers ? (
                                        <LoadingButton
                                            onPress={this.handleWaiversClick}
                                            styleNames={['large', 'narrow']}
                                            title="Sign Waiver"
                                        />
                                    ) : null}

                                    <LoadingButton
                                        onPress={this.handleCheckInClick}
                                        styleNames={['large', 'narrow']}
                                        title="Check In"
                                    />
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
    seller: state.auth.seller,
    experiences: state.experiences,
    connectedReader: state.readers.connectedReader,
});

const mapDispatchToProps = {
    authenticateUser,
    fetchExperiences,
    resetCart,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
