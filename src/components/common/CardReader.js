import LoadingButton from './LoadingButton';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './CardReaderStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';

class CardReader extends Component {
    static propTypes = {
        onConnect: PropTypes.func,
        onDisconnect: PropTypes.func,
        onOpenCheckout: PropTypes.func,
        reader: PropTypes.object,
        isConnected: PropTypes.bool,
        isPaired: PropTypes.bool,
    };

    connectReader = () => {
        this.props.onConnect(this.props.reader.serialNumber);
    };

    disconnectReader = () => {
        this.props.onDisconnect(this.props.reader.serialNumber);
    };

    openCheckout = () => {
        this.props.onOpenCheckout();
    };

    render() {
        const { reader, isLoading } = this.props;

        return (
            <View style={styles.container}>
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
