import React, { Component } from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import CardReader from '../common/CardReader';
import {
    discoverReaders,
    readersDiscovered,
    connectReader,
    disconnectReader,
    saveComputer,
    getComputer,
    abortDiscoverReaders,
} from '../../actions/readersActions';
import Header from '../common/Header';
import LoadingButton from '../common/LoadingButton';
import styles from './DiscoverDevicesStyle';
import NavigationService from '../NavigationService';
import StyledText from '../common/StyledText';
import TextInput from '../common/TextInput';
import { Formik } from 'formik';
import ErrorMessage from '../form/ErrorMessage';
import { object, string } from 'yup';
import { getPairedReader } from '../../selectors/readersSelector';
import { w } from '../../utils/Scale';

const computerSchema = object().shape({
    label: string().required('Required'),
});

class DiscoverDevices extends Component {
    state = {
        label: ''
    }

    componentDidMount() {
        this.props.getComputer();
        this.handleSubmit('')
    }

    handleOpenCheckout = () => {
        NavigationService.navigate('Home');
    };

    handleSubmit = async () => {
        const { saveComputer, readers, discoverReaders, abortDiscoverReaders } = this.props;

        if (readers.isDiscovering) {
            abortDiscoverReaders();
        } else {
            await saveComputer(this.state.label);
            discoverReaders();
        }
    };

    handleChange = (label) => {
        this.setState({ label })
    }

    componentWillUnmount() {
        this.props.abortDiscoverReaders();
    }

    noReadersFound() {
        const { readers } = this.props;
        return !readers.isDiscovering && readers.discoverSubmitCount > 0 && readers.availableReaders.length === 0;
    }

    render() {
        const { readers, pairedDevice } = this.props;
        const { availableReaders, connectedReader, computer, isDiscovering } = readers;

        return (

            <Layout>
                <ScrollView style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.title}>Hardware Configuration</Text>
                    </View>
                    <View style={styles.pos}>
                        <Text style={styles.headline}>
                            Payment Terminal
                        </Text>
                        <TextInput
                            onChangeText={(text) => this.handleChange(text)}
                            value={this.state.label}
                            placeholder="Enter a label to identify this mobile device"
                            editable={!isDiscovering}
                            title="Pos Station label"
                            onEndEditing={() => this.handleSubmit()}
                        />
                        <ErrorMessage name="label" />
                    </View>

                    <Text style={[styles.label, { paddingTop: w(20) }]}>
                        Available Devices
                    </Text>

                    {!isDiscovering && !connectedReader ? (
                        <StyledText styleNames={['h3']}>
                            {this.noReadersFound()
                                && 'No readers found'
                            }
                        </StyledText>
                    ) : null}

                    {isDiscovering && availableReaders.length === 0 ? (
                        <StyledText styleNames={['h3']}>Looking for devices...</StyledText>
                    ) : null}

                    {connectedReader ? (
                        <CardReader
                            reader={{ serialNumber: connectedReader }}
                            onDisconnect={this.props.disconnectReader}
                            // onOpenCheckout={this.handleOpenCheckout}
                            isConnected
                            isPaired
                        />
                    ) : null}

                    {availableReaders.map(reader => {
                        const isPaired = pairedDevice
                            ? pairedDevice.serialNumber === reader.serialNumber
                            : false;

                        return isDiscovering ? (
                            <CardReader
                                key={reader.serialNumber}
                                reader={reader}
                                isPaired={isPaired}
                                onConnect={this.props.connectReader}
                                isLoading={readers.isConnecting === reader.serialNumber}
                            />
                        ) : null;
                    })}


                    <Text style={styles.headline}>
                        Receipt Printing
                    </Text>
                    <Text style={styles.label}>
                        Select Printer
                    </Text>
                </ScrollView>

            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    pairedDevice: getPairedReader(state),
    readers: state.readers,
});

const mapDispatchToProps = {
    discoverReaders,
    abortDiscoverReaders,
    readersDiscovered,
    connectReader,
    disconnectReader,
    saveComputer,
    getComputer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DiscoverDevices);
