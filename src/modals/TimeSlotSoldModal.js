import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './StripeFirmWareUpdateModalStyle.js';
import variables from '../styles/variables.js';

const ModalButton = ({ title, backgroundColor, textColor, onPress, customStyles }) => {
    return <TouchableOpacity onPress={() => onPress()} style={[styles.buttonContainer, { backgroundColor: backgroundColor }, customStyles]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
}

class TimeSlotSoldModal extends Component {
    render() {
        const { toggle, onClose, ...rest } = this.props;

        return (
            <Modal visible={toggle} transparent={true} {...rest}>
                <View style={styles.container}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Sold Out</Text>
                        <Text style={[styles.subTitle, { textAlign: 'center' }]}>
                            The date and time you had chosen just got sold out. Please try a different time in order to complete your purchase.
                        </Text>
                        <View style={[styles.buttons, { justifyContent: 'center' }]}>
                            <ModalButton
                                onPress={onClose}
                                title="Choose another time"
                                backgroundColor={variables.mainBlue}
                                textColor={variables.white}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default TimeSlotSoldModal;
