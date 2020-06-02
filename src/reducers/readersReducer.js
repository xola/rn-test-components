import {
    DISCOVER_READERS_REQUESTED,
    DISCOVER_READERS_FAILED,
    CONNECT_READER_SUCCEEDED,
    DISCONNECT_READER_SUCCEEDED,
    SAVE_COMPUTER_SUCCEEDED,
    COMPUTER_GET_SUCCEEDED,
    ABORT_DISCOVER_READERS,
    READERS_DISCOVERED,
    CONNECT_READER_REQUESTED,
    CONNECT_READER_FAILED,
} from '../actions/readersActions';
import _ from 'lodash';
import { createReducer } from '@reduxjs/toolkit';

/**
 *
 * computer - hash of computer label and Object Id given to the device Kiosk is being used on
 * connectedReader - serial number of the reader that is connected to the device
 * availableReaders - array of readers discovered via Bluetooth
 * isConnected - is reader currently connected to the device
 */
export const initialState = {
    isDiscovering: false,
    isConnecting: null,
    computer: null,
    availableReaders: [],
    connectedReader: null,
    timeoutId: null,
    discoverSubmitCount: 0,
};

const readersReducer = createReducer(initialState, {
    [DISCOVER_READERS_REQUESTED](state, { timeoutId }) {
        state.isDiscovering = true;
        state.availableReaders = [];
        state.connectedReader = null;
        state.timeoutId = timeoutId;
        state.discoverSubmitCount++;
    },

    [DISCOVER_READERS_FAILED](state) {
        state.isDiscovering = false;
    },

    [READERS_DISCOVERED](state, { readers }) {
        state.availableReaders = readers;
    },

    [ABORT_DISCOVER_READERS](state) {
        state.isDiscovering = false;
    },

    [DISCOVER_READERS_FAILED](state) {
        state.isDiscovering = false;
    },

    [CONNECT_READER_REQUESTED](state, { serialNumber }) {
        state.isConnecting = serialNumber;
    },

    [CONNECT_READER_SUCCEEDED](state, { serialNumber }) {
        state.connectedReader = serialNumber;
        state.isDiscovering = false;
        state.isConnecting = null;
    },

    [CONNECT_READER_FAILED](state) {
        state.isConnecting = null;
    },

    [DISCONNECT_READER_SUCCEEDED](state) {
        state.connectedReader = null;
        state.isDiscovering = false;
    },

    [SAVE_COMPUTER_SUCCEEDED](state, { computer }) {
        state.computer = computer;
    },

    [COMPUTER_GET_SUCCEEDED](state, { computer }) {
        state.computer = computer;
    },
});

export default readersReducer;
