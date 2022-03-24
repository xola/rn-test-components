import LoadingButton from './LoadingButton';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './CardReaderStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';
import StripeFirmWareUpdateModal from '../../modals/StripeFirmWareUpdateModal';
import StripeTerminal from 'crowdbotics-react-native-stripe-terminal';

class CardReader extends Component {
    static propTypes = {
        onConnect: PropTypes.func,
        onDisconnect: PropTypes.func,
        onOpenCheckout: PropTypes.func,
        reader: PropTypes.object,
        isConnected: PropTypes.bool,
        isPaired: PropTypes.bool,
    };

    state = {
        updateType: 'mandatory',
        showUpdateModal: false,
        batteryStatus: 'on'
    }

    componentDidMount() {
        StripeTerminal.addReaderSoftwareUpdateProgressListener(({ progress }) => {
            console.log(progress)
        })

        StripeTerminal.addUpdateFailedBatteryLowListener(({ error }) => {
            this.setState({ batteryStatus: 'off' })
        })

        StripeTerminal.addReaderUpdateAvailableListener(({ firmwareUpdate }) => {
            this.setState({ showUpdateModal: true, updateType: 'optional' })
        })

        StripeTerminal.addUpdateInstallStartListener(({ firmwareUpdate }) => {
            console.log('firware update started')
            this.setState({ showUpdateModal: true, updateType: 'mandatory' })
        })

        StripeTerminal.addUpdateInstallFinishListener(({ firmwareUpdate }) => {
            console.log('finishupdate')
            this.setState({ showUpdateModal: false })
        })
    }

    connectReader = () => {
        this.props.onConnect(this.props.reader.serialNumber);
    };

    disconnectReader = () => {
        this.props.onDisconnect(this.props.reader.serialNumber);
    };

    openCheckout = () => {
        this.props.onOpenCheckout();
    };

    firmwareUpdate = () => {
        this.setState({ showUpdateModal: false })
        StripeTerminal.installUpdate()
    }

    render() {
        const { reader, isLoading } = this.props;

        return (
            <View style={styles.container}>
                <StripeFirmWareUpdateModal
                    transparent={true}
                    toggle={this.state.showUpdateModal}
                    batteryStatus={this.state.batteryStatus}
                    updateType={this.state.updateType}
                    estTime="5 mins"
                    onSubmit={() => this.firmwareUpdate()}
                    onCancel={() => this.setState({ showUpdateModal: false })}
                />
                <StyledText style={styles.name}>{reader.serialNumber} </StyledText>

                {this.props.isConnected ? (
                    <View style={styles.actions}>
                        <Text style={styles.paired}>{this.props.isPaired ? 'Paired' : ''}</Text>

                        <LoadingButton
                            title="Disconnect"
                            styleNames={['small', 'cancel']}
                            onPress={this.disconnectReader}
                            isLoading={isLoading}
                        />

                        <LoadingButton
                            title="Open Checkout"
                            styleNames={['small', 'success']}
                            onPress={this.openCheckout}
                            isLoading={isLoading}
                        />
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <Text style={styles.paired}>{this.props.isPaired ? 'Paired' : ''}</Text>

                        <LoadingButton
                            onPress={this.connectReader}
                            styleNames={['small']}
                            title={this.props.isPaired ? 'Connect' : 'Pair'}
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                )}

            </View>
        );
    }
}

export default CardReader;
