import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import _ from 'lodash';
import SelectDropdown from 'react-native-select-dropdown'
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
import styles from './DiscoverDevicesStyle';
import NavigationService from '../NavigationService';
import StyledText from '../common/StyledText';
import TextInput from '../common/TextInput';
import ErrorMessage from '../form/ErrorMessage';
import { object, string } from 'yup';
import { getPairedReader } from '../../selectors/readersSelector';
import { w } from '../../utils/Scale';
import { BackIcon, DropDownIcon } from '../../images/svg';

const computerSchema = object().shape({
    label: string().required('Required'),
});

const printers = ["Select Printer", "Printer 1", "Printer 2", "Printer 3", "Printer 4"]

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
                <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.back}>
                    <BackIcon />
                </TouchableOpacity>
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
                        <Text style={styles.buttonText}>
                            {this.noReadersFound()
                                && 'No readers found'
                            }
                        </Text>
                    ) : null}

                    {isDiscovering && availableReaders.length === 0 ? (
                        <Text style={styles.buttonText}>Looking for devices...</Text>
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
                    <SelectDropdown
                        data={printers}
                        defaultValue="Select Printer"
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.printerButton}
                        buttonTextStyle={styles.buttonText}
                        rowTextStyle={styles.buttonText}
                        rowStyle={styles.rowStyle}
                        renderDropdownIcon={() => <DropDownIcon />}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverDevices);
