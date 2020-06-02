import React, { Component } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import styles from './StripePaymentModalStyle';
import CustomIcon from '../components/common/CustomIcon';
import LoadingButton from '../components/common/LoadingButton';
import { STATUS_CONFIRMING, STATUS_ERROR } from '../constants/paymentConstants';

class StripePaymentModal extends Component {
    state = {
        counter: 60 * 5,
    };

    componentDidMount() {
        if (!this.props.payment.isInitiated) {
            this.props.onPaymentCollect({
                success: this.props.onCommit,
            });
        }
        if (this.state.counter === 0) {
            this.props.onClose();
        }
        this.interval = setInterval(() => {
            this.setState({ counter: this.state.counter - 1 });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    formatTime(time) {
        let minutes = parseInt(time / 60, 10);
        let seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes + ':' + seconds;
    }

    render() {
        const { toggle, onCloseClick, ...rest } = this.props;
        const time = this.formatTime(this.state.counter.toString());

        return (
            <Modal toggle={toggle} transparent={true} {...rest}>
                <View style={styles.container}>
                    {this.props.payment.status === STATUS_ERROR ? (
                        <View>
                            <Image style={styles.image} source={require('../images/chip.png')} />
                            <Text style={styles.action}>Complete payment using {this.props.device}</Text>
                            <Text style={styles.info}>
                                The order will be placed once the payment is processed successfully.
                            </Text>
                            <View style={styles.notices}>
                                <Text style={[styles.notice, styles.alert]}>
                                    <CustomIcon style={styles.icon} size={20} name="cancel-circle" />{' '}
                                    {this.props.payment.errorMessage}
                                </Text>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.buttons}>
                                    <LoadingButton
                                        onPress={this.props.onRetry}
                                        title="Try another card"
                                        styleNames={['success', 'large', 'noRadius']}
                                    />
                                    <LoadingButton
                                        onPress={this.props.onClose}
                                        title="Cancel transaction"
                                        styleNames={['cancel', 'large', 'noRadius']}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : this.props.payment.status === STATUS_CONFIRMING ? (
                        <View>
                            <Image style={styles.image} source={require('../images/chip.png')} />
                            <Text style={styles.action}>Complete payment using {this.props.device}</Text>
                            <View style={styles.notices}>
                                <Text style={[styles.notice, styles.success]}>
                                    <CustomIcon style={styles.icon} size={20} name="tick-bold" /> Payment completed,
                                    creating order
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Image style={styles.image} source={require('../images/chip.png')} />
                            <Text style={styles.time}>{time}</Text>
                            <Text style={styles.action}>Complete payment using {this.props.device}</Text>
                            <Text style={styles.info}>
                                You have 5 minutes to complete this transaction, after which the booking will expire.
                            </Text>
                            <View style={styles.notices}>
                                <Text style={[styles.notice, styles.neutral]}>
                                    <CustomIcon style={styles.icon} size={20} name="info" /> Waiting for payment
                                </Text>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.buttons}>
                                    <LoadingButton
                                        title="Cancel transaction"
                                        onPress={this.props.onClose}
                                        styleNames={['cancel', 'large', 'noRadius']}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
        );
    }
}

export default StripePaymentModal;
