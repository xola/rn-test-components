import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import xolaApi from '../../api/xolaApi';
import { connect } from 'react-redux';
import NavigationService from '../NavigationService';
import Layout from '../common/Layout';
import { fetchExperiences } from '../../actions/experiencesActions';
import LoadingButton from '../common/LoadingButton';
import styles from './HomeStyle';
import StyledText from '../common/StyledText';

class Setup extends Component {
    componentDidMount() {
        this.props.fetchExperiences();
    }

    handleLaunchKioskClick = () => {
        NavigationService.navigate('Home');
    };

    handlePaymentHardwareClick = () => {
        NavigationService.navigate('DiscoverDevices');
    };

    render() {
        const { seller } = this.props;
        const logoUrl = xolaApi.xolaUrl(`/api/sellers/${seller.id}/logo?height=512&format=png`);

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
                                    <LoadingButton
                                        onPress={this.handleLaunchKioskClick}
                                        styleNames={['large', 'success', 'wide']}
                                        title="Launch Kiosk"
                                    />
                                    {this.props.isEMVEnabled ? (
                                        <LoadingButton
                                            onPress={this.handlePaymentHardwareClick}
                                            styleNames={['large']}
                                            title="Configure Payment Hardware"
                                        />
                                    ) : null}
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
    isEMVEnabled: state.auth.isEMVEnabled,
});

const mapDispatchToProps = {
    fetchExperiences,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Setup);
