import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './StripeFirmWareUpdateModalStyle.js';
import variables from '../styles/variables.js';

const ModalButton = ({ title, backgroundColor, textColor, onPress, customStyles }) => {
    return <TouchableOpacity onPress={() => onPress()} style={[styles.buttonContainer, { backgroundColor: backgroundColor }, customStyles]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
}

class Error409Modal extends Component {
    render() {
        const { toggle, onClose, title, body, buttonTitle, ...rest } = this.props;

        return (
            <Modal visible={toggle} transparent={true} {...rest}>
                <View style={styles.container}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={[styles.subTitle, { textAlign: 'center' }]}>
                            {body}
                        </Text>
                        <View style={[styles.buttons, { justifyContent: 'center' }]}>
                            <ModalButton
                                onPress={onClose}
                                title={buttonTitle}
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

export default Error409Modal;
