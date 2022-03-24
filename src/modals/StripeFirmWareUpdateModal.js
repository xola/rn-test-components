import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './StripeFirmWareUpdateModalStyle.js';
import variables from '../styles/variables.js';

const getSubTitle = (
    status,
    type,
    estTime,
) => {
    if (type === 'mandatory') {
        switch (status) {
            case 'off':
                return 'A mandatory firmware update is required for your payment device to operate. We are unable to install this update because your battery is too low. Please charge your device for at least 4 hours before using it again. You will not be able to use your Payment Device until this update is installed.'
            case 'on':
                return `A mandatory firmware update is being installed on your Payment Device. Please keep your device plugged in for the duration of this update. You may continue to use the Xola app while the update is being installed, however, you will not be able to collect payment using your Payment Device.`
            default:
                return ''
        }
    } else {
        switch (status) {
            case 'off':
                return 'An optional firmware update is available for your payment device.. We are unable to install this update because your battery is too low. Please charge your device for at least 4 hours if you want to install it.'
            case 'on':
                return `A firmware update is available for your Payment Device. This update is estimated to take ${estTime} to install. Please keep your device plugged in for the duration of this update. You may continue to use the Xola app while the update is being installed, however you will not be able to collect payment using your Payment Device.\n\nWould you like to install this update now?`
            default:
                return ''
        }
    }
}

const getTitle = (
    type,
) => {
    if (type === 'mandatory') {
        return 'Firmware Update'
    } else {
        return 'Firmware Update Available'
    }
}

const ModalButton = ({ title, backgroundColor, textColor, onPress, customStyles }) => {
    return <TouchableOpacity onPress={() => onPress()} style={[styles.buttonContainer, { backgroundColor: backgroundColor }, customStyles]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
}

class StripeFirmWareUpdateModal extends Component {
    componentDidMount() {

    }

    onConfirm = async () => {
        this.props.onSubmit()
    }

    onDismiss = () => {
        this.props.onCancel()
    }

    render() {
        const { toggle, batteryStatus, updateType, estTime, onCloseClick, ...rest } = this.props;

        return (
            <Modal visible={toggle} transparent={true} {...rest}>
                <View style={styles.container}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{getTitle(updateType)}</Text>
                        <Text style={styles.subTitle}>
                            {getSubTitle(batteryStatus, updateType, estTime)}
                        </Text>

                        {updateType === 'optional' ? <View style={styles.buttons}>
                            <ModalButton
                                onPress={() => this.onConfirm()}
                                title="Install Now"
                                backgroundColor={variables.mainBlue}
                                textColor={variables.white}
                            />
                            <ModalButton
                                onPress={() => this.onDismiss()}
                                customStyles={{ marginRight: 10 }}
                                title="Cancel"
                                backgroundColor={variables.white}
                                textColor={variables.grayBase}
                            />
                        </View> : <View style={styles.buttons}>
                            <ModalButton
                                onPress={() => this.onDismiss()}
                                title="Ok"
                                backgroundColor={variables.mainBlue}
                                textColor={variables.white}
                            />
                        </View>}
                    </View>
                </View>
            </Modal>
        );
    }
}

export default StripeFirmWareUpdateModal;
