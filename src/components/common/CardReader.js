import PairButton from './PairButton';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './CardReaderStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';
import StripeFirmWareUpdateModal from '../../modals/StripeFirmWareUpdateModal';
import StripeTerminal from 'crowdbotics-react-native-stripe-terminal';
import { BBPoSICon, XolaDeviceIcon } from '../../images/svg';

class CardReader extends Component {
    static propTypes = {
        onConnect: PropTypes.func,
        onDisconnect: PropTypes.func,
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
                <View style={styles.row}>
                    {this.props.isPaired ? <BBPoSICon /> : <XolaDeviceIcon />}
                    <Text style={styles.name}>{reader.serialNumber} </Text>
                    {(this.props.isPaired || this.props.isConnected) && <View style={styles.pairedContainer}>
                        <Text style={styles.isPaired}>{'Paired'}</Text>
                    </View>}
                </View>

                {this.props.isConnected ? (
                    <View style={styles.actions}>
                        <PairButton
                            hasIcon={true}
                            title="UnPair"
                            onPress={this.disconnectReader}
                            isLoading={isLoading}
                            isPaired={this.props.isPaired}
                        />
                    </View>
                ) : (
                    <PairButton
                        hasIcon={true}
                        onPress={this.connectReader}
                        isPaired={this.props.isPaired}
                        title={'Pair'}
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                )}
            </View>
        );
    }
}

export default CardReader;
