import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
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

const computerSchema = object().shape({
    label: string().required('Required'),
});

class DiscoverDevices extends Component {
    componentDidMount() {
        this.props.getComputer();
    }

    handleOpenCheckout = () => {
        NavigationService.navigate('Home');
    };

    handleSubmit = async ({ label }) => {
        const { saveComputer, readers, discoverReaders, abortDiscoverReaders } = this.props;

        if (readers.isDiscovering) {
            abortDiscoverReaders();
        } else {
            await saveComputer(label);
            discoverReaders();
        }
    };

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
            <Formik
                initialValues={{ label: computer ? computer.label : '' }}
                onSubmit={this.handleSubmit}
                validationSchema={computerSchema}
                enableReinitialize
            >
                {({ handleChange, handleSubmit, values }) => (
                    <Layout header={<Header title={'Payment Hardware Settings'} back={'Setup'} />}>
                        <View style={styles.container}>
                            <View style={styles.pos}>
                                <StyledText styleNames={['h1']} style={styles.headline}>
                                    POS Label <StyledText styleNames={['h2', 'required']}>*</StyledText>
                                </StyledText>

                                <TextInput
                                    onChangeText={handleChange('label')}
                                    value={values.label}
                                    placeholder="Enter a label to identify this mobile device"
                                    editable={!isDiscovering}
                                />

                                <ErrorMessage name="label" />
                            </View>

                            <View style={styles.devices}>
                                <StyledText styleNames={['h1']} style={styles.headline}>
                                    Devices {isDiscovering ? <ActivityIndicator style={{ paddingBottom: 2 }} /> : null}
                                </StyledText>

                                {!isDiscovering && !connectedReader ? (
                                    <StyledText styleNames={['h3']}>
                                        {this.noReadersFound()
                                            ? 'No readers found'
                                            : 'Click on Discover Devices button to find available devices'}
                                    </StyledText>
                                ) : null}

                                {isDiscovering && availableReaders.length === 0 ? (
                                    <StyledText styleNames={['h3']}>Looking for devices...</StyledText>
                                ) : null}

                                {connectedReader ? (
                                    <CardReader
                                        reader={{ serialNumber: connectedReader }}
                                        onDisconnect={this.props.disconnectReader}
                                        onOpenCheckout={this.handleOpenCheckout}
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
                            </View>
                        </View>

                        <View style={styles.discover}>
                            <LoadingButton
                                title={isDiscovering ? 'Stop Discover Devices' : 'Discover Devices'}
                                styleNames={['large']}
                                onPress={handleSubmit}
                            />
                        </View>
                    </Layout>
                )}
            </Formik>
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
