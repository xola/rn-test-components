import { Platform } from 'react-native';
import {
    InterfaceType,
    StarConnectionSettings,
    StarDeviceDiscoveryManagerFactory,
    StarPrinter,
} from 'react-native-star-io10';
import { StarXpandCommand } from 'react-native-star-io10/index';

export const TICKET_PRINTING_WIDTH = 506;

const TicketPrinterService = {
    async discoverPrinters(onPrinterFound) {
        const interfaceTypes = (Platform.OS == 'android') ? [
            InterfaceType.Lan,
            InterfaceType.Bluetooth,
            InterfaceType.Usb,
        ] : [
            InterfaceType.Lan,
            InterfaceType.Bluetooth,
            InterfaceType.BluetoothLE,
            InterfaceType.Usb,
        ];
        
        const manager = await StarDeviceDiscoveryManagerFactory.create(interfaceTypes);
        manager.discoveryTime = 1000 * 60;
        manager.onPrinterFound = async printer => {
            onPrinterFound(printer);
        };

        await manager.startDiscovery();
    },

    async printTicket(savedPrinter, uri) {
        try {
            var settings = new StarConnectionSettings();
            settings.interfaceType = savedPrinter.connectionSettings.interfaceType;
            settings.identifier = savedPrinter.connectionSettings.identifier;
            const printer = new StarPrinter(settings);

            await printer.open();

            const builder = new StarXpandCommand.StarXpandCommandBuilder();
            builder.addDocument(
                new StarXpandCommand.DocumentBuilder().addPrinter(
                    new StarXpandCommand.PrinterBuilder()
                        .actionPrintImage(new StarXpandCommand.Printer.ImageParameter(uri, TICKET_PRINTING_WIDTH))
                        .actionCut(StarXpandCommand.Printer.CutType.Partial),
                ),
            );

            const commands = await builder.getCommands();

            await printer.print(commands);
            await printer.close();
        } catch (error) {
            console.log(error);
        }
    },

    async printTestTicket(savedPrinter) {
        try {
            var settings = new StarConnectionSettings();
            settings.interfaceType = savedPrinter.connectionSettings.interfaceType;
            settings.identifier = savedPrinter.connectionSettings.identifier;
            const printer = new StarPrinter(settings);

            await printer.open();

            const builder = new StarXpandCommand.StarXpandCommandBuilder();
            builder.addDocument(
                new StarXpandCommand.DocumentBuilder().addPrinter(
                    new StarXpandCommand.PrinterBuilder()
                        .actionPrintText('XOLA TEST\n' + 'TICKET PRINTING\n' + 'THANKS FOR ALL THE FISH\n' + '\n')
                        .actionCut(StarXpandCommand.Printer.CutType.Partial),
                ),
            );

            const commands = await builder.getCommands();

            await printer.print(commands);
            await printer.close();
        } catch (error) {
            console.log(error);
        }
    },
};

export default TicketPrinterService;
