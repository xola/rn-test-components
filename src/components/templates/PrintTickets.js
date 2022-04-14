import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ticket from './Ticket';
import { View } from 'react-native';
import _ from 'lodash';

const TICKET_GENERATION_STRATEGY_BOOKING = 'booking';
const TICKET_GENERATION_STRATEGY_GUEST = 'guest';

class PrintTickets extends Component {
    static propTypes = {
        item: PropTypes.object,
        order: PropTypes.object,
        printer: PropTypes.object,
        experience: PropTypes.object,
    };

    render() {
        const { qrCodePreference } = this.props.experience;
        const ticketGenerationStrategy = qrCodePreference ? qrCodePreference.ticketGenerationStrategy : false;

        if (!qrCodePreference || !qrCodePreference.enabled) {
            return null;
        }
        const totalTickets =
            ticketGenerationStrategy === TICKET_GENERATION_STRATEGY_BOOKING ? 1 : this.props.item.guests.length;

        if (ticketGenerationStrategy === TICKET_GENERATION_STRATEGY_BOOKING) {
            return (
                <Ticket
                    item={this.props.item}
                    isBookingLevel={true}
                    order={this.props.order}
                    printer={this.props.printer}
                    experience={this.props.experience}
                    onTicketLoad={this.props.onTicketLoad}
                    currentTicket={1}
                    totalTickets={totalTickets}
                />
            );
        } else {
            return (
                <View>
                    {_.map(this.props.item.guests, (guest, index) => (
                        <Ticket
                            key={guest.id}
                            item={this.props.item}
                            isBookingLevel={false}
                            order={this.props.order}
                            printer={this.props.printer}
                            experience={this.props.experience}
                            guest={guest}
                            onTicketLoad={this.props.onTicketLoad}
                            currentTicket={index + 1}
                            totalTickets={totalTickets}
                        />
                    ))}
                </View>
            );
        }
    }
}

export default PrintTickets;
