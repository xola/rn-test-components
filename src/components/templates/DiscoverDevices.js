import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { connect } from 'react-redux';
import { getDeviceName } from 'react-native-device-info';
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
import { discoverPrinters, savePrinter, printTest } from '../../actions/printerActions';
import styles from './DiscoverDevicesStyle';
import NavigationService from '../NavigationService';
import TextInput from '../common/TextInput';
import ErrorMessage from '../form/ErrorMessage';
import { object, string } from 'yup';
import { getPairedReader } from '../../selectors/readersSelector';
import { w } from '../../utils/Scale';
import { BackIcon, DropDownIcon } from '../../images/svg';

class DiscoverDevices extends Component {
    state = {
        label: '',
    };

    componentDidMount() {
        this.props.getComputer();
        this.handleSubmit();
        this.getDeviceInfo()
    }

    getDeviceInfo = async () => {
        const label = await getDeviceName()
        this.setState({ label })
    }

    handleSubmit = async () => {
        const { saveComputer, readers, discoverReaders, abortDiscoverReaders, discoverPrinters } = this.props;
        if (readers.connectedReader) {
            await this.props.disconnectReader();
        }
        if (readers.isDiscovering) {
            abortDiscoverReaders();
        } else {
            await saveComputer(this.state.label);
            discoverReaders();
            discoverPrinters();
        }
    };

    handleChange = label => {
        this.setState({ label });
    };

    componentWillUnmount() {
        this.props.abortDiscoverReaders();
    }

    noReadersFound() {
        const { readers } = this.props;
        return !readers.isDiscovering && readers.discoverSubmitCount > 0 && readers.availableReaders.length === 0;
    }

    render() {
        const { readers, pairedDevice, printer } = this.props;
        const { availableReaders, connectedReader, computer, isDiscovering } = readers;
        const { printers } = printer;

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
                        <Text style={styles.headline}>Payment Terminal</Text>
                        <TextInput
                            onChangeText={text => this.handleChange(text)}
                            value={this.state.label}
                            placeholder="Enter a label to identify this mobile device"
                            editable={false}
                            title="Pos Station label"
                            onEndEditing={this.handleSubmit}
                        />
                        <ErrorMessage name="label" />
                    </View>

                    <Text style={[styles.label, { paddingTop: w(20) }]}>Available Devices</Text>

                    {!isDiscovering && !connectedReader ? (
                        <Text style={styles.buttonText}>{this.noReadersFound() && 'No readers found'}</Text>
                    ) : null}

                    {isDiscovering && availableReaders.length === 0 ? (
                        <Text style={styles.buttonText}>Looking for devices...</Text>
                    ) : null}

                    {connectedReader ? (
                        <CardReader
                            reader={{ serialNumber: connectedReader }}
                            onDisconnect={this.props.disconnectReader}
                            isConnected
                            isPaired
                        />
                    ) : null}

                    {availableReaders.map(reader => {
                        const isPaired = pairedDevice ? pairedDevice.serialNumber === reader.serialNumber : false;

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

                    <Text style={styles.headline}>Ticket Printing</Text>
                    <Text style={styles.label}>Select Printer</Text>
                    <SelectDropdown
                        data={printers}
                        defaultValue="Select Printer"
                        onSelect={(selectedItem, index) => {
                            this.props.savePrinter(selectedItem);
                            //this.props.printTest(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.connectionSettings.identifier;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.connectionSettings.identifier;
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
    printer: state.printer,
});

const mapDispatchToProps = {
    discoverReaders,
    abortDiscoverReaders,
    readersDiscovered,
    connectReader,
    disconnectReader,
    saveComputer,
    getComputer,
    discoverPrinters,
    savePrinter,
    printTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverDevices);
