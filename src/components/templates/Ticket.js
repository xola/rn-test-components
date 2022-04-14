import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewShot from 'react-native-view-shot';
import { Image } from 'react-native';
import xolaApi from '../../api/xolaApi';
import moment from 'moment';
import StyledText from '../common/StyledText';
import styles from './TicketStyle';
import orderUtil from '../../utils/OrderUtil';

class Ticket extends Component {
    static propTypes = {
        item: PropTypes.object,
        order: PropTypes.object,
        printer: PropTypes.object,
        experience: PropTypes.object,
        isBookingLevel: PropTypes.bool,
        guest: PropTypes.object,
        onTicketLoad: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.viewShot = null;

        this.setViewShotRef = element => {
            this.viewShot = element;
        };
    }

    onQRCodeLoad = () => {
        this.viewShot.capture().then(uri => {
            this.props.onTicketLoad(uri, this.props.totalTickets);
        });
    };

    render() {
        const { name } = this.props.experience;
        const { guest } = this.props;
        const { arrival, arrivalTime, arrivalDatetime } = this.props.item;
        let arrivalDate;

        if (arrivalDatetime) {
            arrivalDate = moment(arrivalDatetime);
        } else {
            arrivalDate = moment(arrival);
            if (arrivalTime) {
                const time = arrivalTime.toString().padStart(3, '0');
                arrivalDate = moment(`${arrival} ${time}`, 'YYYY-MM-DD Hmm');
            }
        }
        const imgUrl = this.props.isBookingLevel
            ? { uri: xolaApi.xolaUrl(`/api/orders/${this.props.order.id}/items/${this.props.item.id}/qrcode`) }
            : {
                  uri: xolaApi.xolaUrl(
                      `/api/orders/${this.props.order.id}/items/${this.props.item.id}/guests/${guest.id}/qrcode`,
                  ),
              };

        return (
            <ViewShot style={styles.container} ref={this.setViewShotRef}>
                <StyledText style={styles.ticketOrder}>
                    Ticket {this.props.currentTicket} of {this.props.totalTickets}
                </StyledText>
                <Image style={styles.image} source={imgUrl} onLoad={this.onQRCodeLoad} />
                {this.props.isBookingLevel ? null : (
                    <StyledText style={styles.demographics}>
                        1 {orderUtil.getDemographicLabel(this.props.experience, guest.demographic.demographic.id)}
                    </StyledText>
                )}
                <StyledText style={styles.name}>{name}</StyledText>
                <StyledText style={styles.infoText}>
                    {arrivalDate.format('L')} {arrivalTime || arrivalDatetime ? arrivalDate.format('LT') : null}
                </StyledText>
            </ViewShot>
        );
    }
}

export default Ticket;
