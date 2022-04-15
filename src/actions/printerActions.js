import TicketPrinterService from '../services/TicketPrinterService';

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
    dispatch({ type: DISCOVER_PRINTERS_STARTED });
    await TicketPrinterService.discoverPrinters(discoveredPrinter);
    dispatch({ type: DISCOVER_PRINTERS_FINISHED });
};

export const discoveredPrinter = printer => async (dispatch, getState) => {
    dispatch({ type: DISCOVERED_PRINTER, printer });
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