import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SuccessInfo from '../common/SuccessInfo';
import Layout from '../common/Layout';
import styles from './SuccessPageStyle';
import NavigationService from '../NavigationService';
import LoadingButton from '../common/LoadingButton';
import PrintTickets from './PrintTickets';
import { addTicket, printTickets } from '../../actions/printerActions';
import { WaiverIcon } from '../../images/svg';

class SuccessPage extends Component {
    handlePrintingTickets = async (ticket, total) => {
        await this.props.addTicket(ticket);
        await this.props.printTickets(total);
    };

    handleWaiverSignIn = () => {
        NavigationService.navigate('SignInWaiver');
    };

    handleFinish = () => {
        NavigationService.navigate('Home');
    };

    render() {
        const { selectedExperience, collection } = this.props.experiences;
        const experience = collection[selectedExperience];
        let submittedItem = null;
        const { submittedOrder, itemIndex } = this.props.cart;
        if (submittedOrder && submittedOrder.items[itemIndex]) {
            submittedItem = submittedOrder.items[itemIndex];
        }

        return (
            <Layout>
                <SuccessInfo
                    title="Purchase Complete"
                    message={'Your booking confirmation has been sent to your [email &/or phone]'}
                />

                {experience.waiverPreference ? (
                    <View style={styles.button}>
                        <LoadingButton
                            onPress={this.handleWaiverSignIn}
                            styleNames={['large', 'wide', 'active']}
                            title="Sign Waiver Now"
                            icon={() => <WaiverIcon />}
                        />
                    </View>
                ) : (
                    <View style={styles.button}>
                        <LoadingButton onPress={this.handleFinish} styleNames={['large', 'active']} title="Done" />
                    </View>
                )}

                {this.props.printer.printer && submittedItem ? (
                    <View>
                        <PrintTickets
                            experience={experience}
                            item={submittedItem}
                            order={submittedOrder}
                            printer={this.props.printer}
                            onTicketLoad={this.handlePrintingTickets}
                        />
                    </View>
                ) : null}
            </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);
