import { View, Text } from 'react-native';
import PrintTickets from './PrintTickets';
import { addTicket, printTickets } from '../../actions/printerActions';
import React, { Component } from 'react';
import styles from './OrderReviewStyle';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import _ from 'lodash';
import LottieView from 'lottie-react-native';

class TicketPrinting extends Component {
    handlePrintingTickets = async (ticket, total) => {
        await this.props.addTicket(ticket);
        await this.props.printTickets(total);
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
            <Layout>
                <View style={styles.ticketContainer}>
                    <View style={styles.lottieContainer}>
                        <LottieView source={require('../../images/lottie/loading.json')} autoPlay loop />
                    </View>
                    <Text style={styles.ticketTitle}>Printing Tickets</Text>
                </View>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TicketPrinting);
