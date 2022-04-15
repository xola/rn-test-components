import { createReducer } from '@reduxjs/toolkit';
import {
    ADD_TICKET,
    DISCOVERED_PRINTER,
    PRINTING_TICKETS_FINISHED,
    RESET_TICKETS,
    SAVE_PRINTER,
    DISCOVER_PRINTERS_STARTED,
    DISCOVER_PRINTERS_FINISHED,
} from '../actions/printerActions';

export const initialState = {
    isDiscovering: false,
    isConnecting: null,
    printers: [],
    printer: null,
    tickets: [],
};

const printerReducer = createReducer(initialState, {
    [SAVE_PRINTER](state, { printer }) {
        state.printer = printer;
    },

    [RESET_TICKETS](state) {
        state.tickets = [];
    },

    [ADD_TICKET](state, { ticket }) {
        state.tickets.push(ticket);
    },

    [DISCOVERED_PRINTER](state, { printer }) {
        state.printers.push(printer);
    },

    [PRINTING_TICKETS_FINISHED](state) {
        state.tickets = [];
    },

    [DISCOVER_PRINTERS_STARTED](state) {
        state.printers = [];
        state.isDiscovering = true;
    },

    [DISCOVER_PRINTERS_FINISHED](state) {
        state.isDiscovering = false;
    },
});

export default printerReducer;
