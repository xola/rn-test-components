import TicketPrinterService from '../services/TicketPrinterService';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

import NavigationService from '../components/NavigationService';

export const SAVE_PRINTER = 'SAVE_PRINTER';
export const ADD_TICKET = 'ADD_TICKET';
export const RESET_TICKETS = 'RESET_TICKETS';
export const DISCOVERED_PRINTER = 'DISCOVERED_PRINTER';

export const DISCOVER_PRINTERS_STARTED = 'DISCOVER_PRINTERS_STARTED';
export const DISCOVER_PRINTERS_FINISHED = 'DISCOVER_PRINTERS_FINISHED';

export const PRINTING_TICKETS_STARTED = 'PRINTING_TICKETS_STARTED';
export const PRINTING_TICKETS_FINISHED = 'PRINTING_TICKETS_FINISHED';

export const savePrinter = printer => async (dispatch, getState) => {
    dispatch({ type: SAVE_PRINTER, printer });
};

export const discoverPrinters = () => async (dispatch, getState) => {

    const isBluetoothEnabled = await BluetoothStatus.state()
    if (isBluetoothEnabled) {
    if (Platform.OS == 'android' && 31 <= Platform.Version) {
            var hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);

            if (!hasPermission) {
                const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
                    
                hasPermission = status == PermissionsAndroid.RESULTS.GRANTED;
            }

            if (!hasPermission) {
                Alert.alert("Error", "Bluetooth permission is required.")
                NavigationService.goBack()
            }
    }

    dispatch({ type: DISCOVER_PRINTERS_STARTED });
    await TicketPrinterService.discoverPrinters(printer => {
        dispatch(discoveredPrinter(printer));
    });
    dispatch({ type: DISCOVER_PRINTERS_FINISHED });
}
};

export const discoveredPrinter = discoveredPrinter => async (dispatch, getState) => {
    const printer = {
        connectionSettings: {
            identifier: discoveredPrinter._connectionSettings.identifier,
            interfaceType: discoveredPrinter._connectionSettings.interfaceType,
        },
    };

    dispatch({
        type: DISCOVERED_PRINTER,
        printer,
    });
};

export const addTicket = ticket => async (dispatch, getState) => {
    dispatch({ type: ADD_TICKET, ticket });
};

export const resetTickets = () => async (dispatch, getState) => {
    dispatch({ type: RESET_TICKETS });
};

export const printTickets = totalTickets => async (dispatch, getState) => {
    const { tickets, printer } = getState().printer;

    if (tickets.length === totalTickets) {
        dispatch({ type: PRINTING_TICKETS_STARTED });
        for (let index = 0; index < tickets.length; index++) {
            await TicketPrinterService.printTicket(printer, tickets[index]);
        }
        dispatch({ type: PRINTING_TICKETS_FINISHED });
    }

    return null;
};

export const printTest = () => async (dispatch, getState) => {
    const { printer } = getState().printer;

    await TicketPrinterService.printTestTicket(printer);
};
