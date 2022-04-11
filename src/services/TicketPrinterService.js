import { InterfaceType, StarDeviceDiscoveryManagerFactory, StarPrinter } from 'react-native-star-io10';
import { StarXpandCommand } from 'react-native-star-io10/index';

const TicketPrinterService = {
    async discoverPrinters(onPrinterFound) {
        const manager = await StarDeviceDiscoveryManagerFactory.create([
            InterfaceType.Lan,
            InterfaceType.Bluetooth,
            InterfaceType.BluetoothLE,
            InterfaceType.Usb,
        ]);
        manager.discoveryTime = 1000;
        manager.onPrinterFound = async printer => {
            onPrinterFound(printer);
            await manager.stopDiscovery();
        };

        manager.onDiscoveryFinished = () => {
            console.log(`Discovery finished.`);
        };

        await manager.startDiscovery();
    },

    async printTicket(printerSettings, uri) {
        const printer = new StarPrinter(printerSettings);

        try {
            await printer.open();

            const builder = new StarXpandCommand.StarXpandCommandBuilder();
            builder.addDocument(
                new StarXpandCommand.DocumentBuilder().addPrinter(
                    new StarXpandCommand.PrinterBuilder()
                        .actionPrintImage(new StarXpandCommand.Printer.ImageParameter(uri, 406))
                        .actionCut(StarXpandCommand.Printer.CutType.Partial),
                ),
            );

            const commands = await builder.getCommands();

            await printer.print(commands);
        } catch (error) {
            console.log(error);
        } finally {
            await printer.close();
            await printer.dispose();
        }
    },
};

export default TicketPrinterService;
