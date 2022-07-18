import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SuccessInfo from '../common/SuccessInfo';
import Layout from '../common/Layout';
import styles from './SuccessPageStyle';
import NavigationService from '../NavigationService';
import LoadingButton from '../common/LoadingButton';
import PrintTickets from './PrintTickets';
import { addTicket, printTickets } from '../../actions/printerActions';
import { WaiverIcon } from '../../images/svg';
import StyledText from '../common/StyledText';

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
                {this.props.route.params?.waiverSigned && (
                    <View style={styles.header}>
                        <StyledText style={{ fontWeight: '700' }} styleNames={['h2']}>
                            Thank You!
                        </StyledText>
                    </View>
                )}
                <Layout>
                    {this.props.route.params?.waiverSigned ? (
                        <SuccessInfo style={styles.info} title={'Waiver Signed'} message={'You’re all set!'} />
                    ) : (
                        <SuccessInfo
                            title={'Purchase Complete'}
                            message={'Your booking confirmation has been sent to your email and phone'}
                        />
                    )}

                    <View style={styles.row}>
                        {experience && experience.waiverPreference && !this.props.route.params?.waiverSigned && (
                            <View style={styles.button}>
                                <LoadingButton
                                    onPress={this.handleWaiverSignIn}
                                    styleNames={['large', 'width300']}
                                    title="Sign Waiver Now"
                                    icon={() => <WaiverIcon />}
                                />
                            </View>
                        )}
                        <View style={styles.button}>
                            <LoadingButton
                                onPress={this.handleFinish}
                                styleNames={['large', 'width300']}
                                title="Done"
                            />
                        </View>
                    </View>

                    {this.props.printer.printer && submittedItem && !this.props.route.params?.waiverSigned ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);
