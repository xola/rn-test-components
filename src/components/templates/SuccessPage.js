import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SuccessInfo from '../common/SuccessInfo';
import Layout from '../common/Layout';
import styles from './SuccessPageStyle';
import NavigationService from '../NavigationService';
import LoadingButton from '../common/LoadingButton';
import OrderInfo from '../common/OrderInfo';
import { WaiverIcon } from '../../images/svg';

class SuccessPage extends Component {
    handleWaiverSignIn = () => {
        NavigationService.navigate('SignInWaiver');
    };

    handleFinish = () => {
        NavigationService.navigate('Home');
    };

    render() {
        const { selectedExperience, collection } = this.props.experiences;
        const experience = collection[selectedExperience];
        const item = this.props.item;

        return (
            <Layout>
                <SuccessInfo title="Purchase Complete" message={"Your booking confirmation has been sent to your [email &/or phone]"} />

                {experience.waiverPreference ? (
                    <View style={styles.button}>
                        <LoadingButton
                            onPress={this.handleWaiverSignIn}
                            styleNames={['large', 'wide', 'active']}
                            title="Sign Waiver Now"
                            icon={() => <WaiverIcon />}
                        />
                    </View>
                ) : <View style={styles.button}>
                    <LoadingButton onPress={this.handleFinish} styleNames={['large', 'active']} title="Done" />
                </View>}

            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences,
    item: state.cart.order.items[state.cart.itemIndex],
});

export default connect(mapStateToProps)(SuccessPage);
