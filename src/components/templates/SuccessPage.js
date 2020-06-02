import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SuccessInfo from '../common/SuccessInfo';
import Layout from '../common/Layout';
import styles from './SuccessPageStyle';
import NavigationService from '../NavigationService';
import LoadingButton from '../common/LoadingButton';
import OrderInfo from '../common/OrderInfo';

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
        const item = this.props.navigation.getParam('item', this.props.item);

        return (
            <Layout>
                <View styles={styles.container}>
                    <SuccessInfo
                        title="Congratulations"
                        message={this.props.navigation.getParam('message', 'Success!')}
                    />

                    <OrderInfo experience={experience} item={item} style={{ alignItems: 'center' }} />

                    {experience.waiverPreference ? (
                        <View style={styles.button}>
                            <LoadingButton
                                onPress={this.handleWaiverSignIn}
                                styleNames={['medium', 'success', 'wide']}
                                title="Sign Waiver"
                            />
                        </View>
                    ) : null}
                    <View style={styles.button}>
                        <LoadingButton onPress={this.handleFinish} styleNames={['medium', 'wide']} title="Finish" />
                    </View>
                </View>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences,
    item: state.cart.order.items[state.cart.itemIndex],
});

export default connect(mapStateToProps)(SuccessPage);
