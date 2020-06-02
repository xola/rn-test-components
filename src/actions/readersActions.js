import StripeTerminal from 'react-native-stripe-terminal';
import AsyncStorage from '@react-native-community/async-storage';
import ObjectID from 'bson-objectid';
import xolaApi from '../api/xolaApi';
import { SIMULATE_STRIPE_TERMINAL } from 'react-native-dotenv';
import PaymentDeviceService from '../services/PaymentDeviceService';
import { getPairedReader } from '../selectors/readersSelector';
import _ from 'lodash';

export const SAVE_COMPUTER_REQUESTED = 'SAVE_COMPUTER_REQUESTED';
export const SAVE_COMPUTER_SUCCEEDED = 'SAVE_COMPUTER_SUCCEEDED';
export const SAVE_COMPUTER_FAILED = 'SAVE_COMPUTER_FAILED';

export const COMPUTER_GET_REQUESTED = 'COMPUTER_GET_REQUESTED';
export const COMPUTER_GET_SUCCEEDED = 'COMPUTER_GET_SUCCEEDED';
export const COMPUTER_GET_FAILED = 'COMPUTER_GET_FAILED';

export const DISCOVER_READERS_REQUESTED = 'DISCOVER_READERS_REQUESTED';
export const DISCOVER_READERS_SUCCEEDED = 'DISCOVER_READERS_SUCCEEDED';
export const DISCOVER_READERS_FAILED = 'DISCOVER_READERS_FAILED';

export const ABORT_DISCOVER_READERS = 'ABORT_DISCOVER_READERS';

export const READERS_DISCOVERED = 'READERS_DISCOVERED';

export const CONNECT_READER_REQUESTED = 'CONNECT_READER_REQUESTED';
export const CONNECT_READER_SUCCEEDED = 'CONNECT_READER_SUCCEEDED';
export const CONNECT_READER_FAILED = 'CONNECT_READER_FAILED';

export const DISCONNECT_READER_REQUESTED = 'DISCONNECT_READER_REQUESTED';
export const DISCONNECT_READER_SUCCEEDED = 'DISCONNECT_READER_SUCCEEDED';
export const DISCONNECT_READER_FAILED = 'DISCONNECT_READER_FAILED';

export const INITIALIZE_TERMINAL_REQUESTED = 'INITIALIZE_TERMINAL_REQUESTED';
export const INITIALIZE_TERMINAL_FAILED = 'INITIALIZE_TERMINAL_FAILED';
export const INITIALIZE_TERMINAL_SUCCEEDED = 'INITIALIZE_TERMINAL_SUCCEEDED';

const DISCOVER_TIMEOUT = 1000 * 60;

let discoverReadersSubscription;

export const discoverReaders = () => async (dispatch, getState) => {
    const { readers, auth } = getState();

    if (readers.isDiscovering) {
        return;
    }

    const timeoutId = setTimeout(() => dispatch(abortDiscoverReaders()), DISCOVER_TIMEOUT);
    dispatch({ type: DISCOVER_READERS_REQUESTED, timeoutId });

    const { data } = await xolaApi.get(`api/sellers/${auth.seller.id}/stripeTerminal/connectionToken`, {
        params: { authenticate: true },
    });

    StripeTerminal.initialize({ fetchConnectionToken: async () => data.secret });
    await StripeTerminal.disconnectReader();

    discoverReadersSubscription = StripeTerminal.addReadersDiscoveredListener(readers => {
        dispatch(readersDiscovered(readers));
    });

    try {
        await StripeTerminal.discoverReaders(
            StripeTerminal.DeviceTypeChipper2X,
            StripeTerminal.DiscoveryMethodBluetoothScan,
            SIMULATE_STRIPE_TERMINAL === 'true',
        );

        dispatch({ type: DISCOVER_READERS_SUCCEEDED });
    } catch (response) {
        dispatch({ type: DISCOVER_READERS_FAILED, error: response.error });
    }
};

export const abortDiscoverReaders = () => (dispatch, getState) => {
    const { readers } = getState();
    clearTimeout(readers.timeoutId);

    if (discoverReadersSubscription) {
        discoverReadersSubscription.remove();
        discoverReadersSubscription = null;
    }

    StripeTerminal.abortDiscoverReaders().catch(() => null);
    dispatch({ type: ABORT_DISCOVER_READERS });
};

export const saveComputer = label => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVE_COMPUTER_REQUESTED });
        const savedComputer = getState().readers.computer;
        const computer = { id: savedComputer ? savedComputer.id : ObjectID().toString(), label };
        await AsyncStorage.setItem('@computer', JSON.stringify(computer));
        dispatch({ type: SAVE_COMPUTER_SUCCEEDED, computer });
    } catch (e) {
        dispatch({ type: SAVE_COMPUTER_FAILED, error: e.message });
    }
};

export const getComputer = () => async dispatch => {
    try {
        dispatch({ type: COMPUTER_GET_REQUESTED });
        const savedComputer = await AsyncStorage.getItem('@computer');
        let computer = null;
        if (savedComputer) {
            computer = JSON.parse(savedComputer);
        }
        dispatch({ type: COMPUTER_GET_SUCCEEDED, computer });
    } catch (e) {
        dispatch({ type: COMPUTER_GET_FAILED, error: e.message });
    }
};

export const readersDiscovered = readers => (dispatch, getState) => {
    // Cancel abort discover timeout when readers are found.
    if (readers.length > 0) {
        clearTimeout(getState().readers.timeoutId);
    }

    dispatch({ type: READERS_DISCOVERED, readers });
};

export const connectReader = serialNumber => async (dispatch, getState) => {
    try {
        dispatch({ type: CONNECT_READER_REQUESTED, serialNumber });

        const { auth, readers } = getState();
        const { computer, connectedReader } = readers;
        const { seller } = auth;
        const { paymentDevices = [] } = seller.preferences.stripeTerminal;

        if (connectedReader) {
            await StripeTerminal.disconnectReader();
        }

        let reader = paymentDevices.find(device => device.serialNumber === serialNumber);
        const pairedReader = getPairedReader(getState());

        if (pairedReader && pairedReader.serialNumber !== serialNumber) {
            await PaymentDeviceService.unpairReader(seller.id, pairedReader.id, pairedReader.computer.id);
        }

        if (!reader) {
            reader = await PaymentDeviceService.saveReader(seller.id, serialNumber);
        }

        if (!reader.computer) {
            reader = await PaymentDeviceService.pairReader(seller.id, reader.id, computer);
        }

        if (reader.computer.id !== computer.id) {
            await PaymentDeviceService.unpairReader(seller.id, reader.id, reader.computer.id);
            await PaymentDeviceService.pairReader(seller.id, reader.id, computer);
        }

        await StripeTerminal.connectReader(serialNumber);
        dispatch({ type: CONNECT_READER_SUCCEEDED, serialNumber });
        dispatch(abortDiscoverReaders());
    } catch (e) {
        const error = e.error || e;
        dispatch({ type: CONNECT_READER_FAILED, error: _.isString(error) ? error : e.message });
    }
};

export const disconnectReader = () => async dispatch => {
    try {
        dispatch({ type: DISCONNECT_READER_REQUESTED });
        await StripeTerminal.disconnectReader();
        dispatch({ type: DISCONNECT_READER_SUCCEEDED });
        dispatch(discoverReaders());
    } catch (e) {
        dispatch({ type: DISCONNECT_READER_FAILED, error: e.message });
    }
};
