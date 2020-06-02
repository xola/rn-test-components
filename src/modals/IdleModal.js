import React, { Component } from 'react';
import NavigationService from '../components/NavigationService';
import { Modal, Text, TouchableOpacity } from 'react-native';

class IdleModal extends Component {
    state = {
        counter: 10,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ counter: this.state.counter - 1 });

            if (this.state.counter <= 0) {
                NavigationService.navigate('Home');
                this.props.onCloseClick();
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { toggle, onCloseClick, ...rest } = this.props;

        return (
            <Modal toggle={toggle} size="lg" {...rest}>
                <Text>You will be redirected in {this.state.counter}...</Text>
                <TouchableOpacity onPress={onCloseClick}>Cancel</TouchableOpacity>
            </Modal>
        );
    }
}

export default IdleModal;
