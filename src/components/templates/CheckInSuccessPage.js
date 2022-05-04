import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SuccessInfo from '../common/SuccessInfo';
import Layout from '../common/Layout';
import styles from './SuccessPageStyle';
import NavigationService from '../NavigationService';
import LoadingButton from '../common/LoadingButton';
import { addTicket, printTickets } from '../../actions/printerActions';
import StyledText from '../common/StyledText';

class CheckInSuccessPage extends Component {
    handleFinish = () => {
        NavigationService.navigate('Home');
    };

    render() {
        let experience;
        let submittedItem = null;
        const { submittedOrder, itemIndex } = this.props.cart;
        if (this.props.experiences && submittedOrder && submittedOrder.items) {
            const { selectedExperience, collection } = this.props.experiences;
            experience = collection[selectedExperience];
            if (submittedOrder && submittedOrder.items[itemIndex]) {
                submittedItem = submittedOrder.items[itemIndex];
            }
        }

        return (
            <>
                <View style={styles.header}>
                    <StyledText style={{ fontWeight: '700' }} styleNames={['h2']}>
                        Thank You!
                    </StyledText>
                </View>
                <Layout>
                    <SuccessInfo
                        title={'Successfully Checked in'}
                        message={`You're all set!`}
                    />
                    <View style={styles.row}>
                        <LoadingButton
                            onPress={this.handleFinish}
                            styleNames={['large', 'width300']}
                            title="Back to Home Screen"
                        />
                    </View>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences,
    cart: state.cart,
    printer: state.printer,
});

const mapDispatchToProps = {
    addTicket,
    printTickets,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInSuccessPage);
