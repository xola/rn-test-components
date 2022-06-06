import React, { Component } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './StripePaymentModalStyle';
import LoadingButton from '../components/common/LoadingButton';
import { STATUS_CONFIRMING, STATUS_ERROR } from '../constants/paymentConstants';
import Layout from '../components/common/Layout';
import { BackIcon, CardIcon, FailedIcon, ProcessingIcon } from '../images/svg';
import NavigationService from '../components/NavigationService';
import Currency from '../components/common/Currency';

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
        const { toggle, onClose, ...rest } = this.props;
        const time = this.formatTime(this.state.counter.toString());

        if (this.props.payment.status === STATUS_ERROR)
            return <Modal toggle={toggle} transparent={false} {...rest}>
                <Layout>
                    <View style={styles.container}>
                        <View style={styles.container}>
                            <FailedIcon />
                            <Text style={styles.title}>Payment Failed</Text>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.buttons}>
                                <LoadingButton
                                    onPress={this.props.onRetry}
                                    title="Try Again"
                                    styleNames={['active', 'large', 'wide']}
                                />
                                <LoadingButton
                                    onPress={this.props.onClose}
                                    title="Cancel Purchase"
                                    styleNames={['inactive', 'large', 'wide']}
                                />
                            </View>
                        </View>
                    </View>
                </Layout>
            </Modal>

        if (this.props.payment.status === STATUS_CONFIRMING)
            return <Modal toggle={toggle} transparent={false} {...rest}>
                <Layout>
                    <View style={styles.container}>
                        <View style={styles.lottieContainer}>
                            <LottieView source={require('../images/lottie/loading.json')} autoPlay loop />
                        </View>
                        <Text style={styles.title}>Processing Payment</Text>
                    </View>
                </Layout></Modal>

        return <Modal toggle={toggle} transparent={false} {...rest}>
            <Layout>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <TouchableOpacity onPress={this.props.onGoBack} style={styles.back}>
                            <BackIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <CardIcon />
                        <Text style={styles.title}>Insert or Tap your Credit Card</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.title}>Total</Text>
                        <Text style={styles.title}><Currency>{this.props.total}</Currency></Text>
                    </View>
                </View></Layout></Modal>
    }
}

export default StripePaymentModal;
