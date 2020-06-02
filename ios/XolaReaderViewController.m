#import "XolaReaderViewController.h"

@implementation XolaReaderViewController

// Action for a "Connect Reader" button
- (void)connectReaderAction {
  SCPDiscoveryConfiguration *config = [[SCPDiscoveryConfiguration alloc] initWithDeviceType:SCPDeviceTypeChipper2X
                                                                            discoveryMethod:SCPDiscoveryMethodBluetoothProximity
                                                                                  simulated:YES];
  self.discoverCancelable = [[SCPTerminal shared] discoverReaders:config delegate:self completion:^(NSError *error) {
    if (error != nil) {
      NSLog(@"discoverReaders failed: %@", error);
    }
    else {
      NSLog(@"discoverReaders succeeded");
    }
  }];
}

#pragma mark - SCPDiscoveryDelegate

- (void)terminal:(SCPTerminal *)terminal didUpdateDiscoveredReaders:(NSArray<SCPReader *> *)readers {
  // Just select the first reader in this example
  SCPReader *selectedReader = [readers firstObject];
  // Only connect if we aren't currently connected.
  if (terminal.connectionStatus != SCPConnectionStatusNotConnected) {
    return;
  }
  
  // In your app, display the discovered reader(s) to the user.
  // Call `connectReader` with the selected reader.
  [[SCPTerminal shared] connectReader:selectedReader completion:^(SCPReader *reader, NSError *error) {
    if (reader != nil) {
      NSLog(@"Successfully connected to reader: %@", reader);
    }
    else {
      NSLog(@"connectReader failed: %@", error);
    }
  }];
}

- (void)terminal:(SCPTerminal *)terminal didReportUnexpectedReaderDisconnect:(SCPReader *)reader NS_SWIFT_NAME(terminal(_:didReportUnexpectedReaderDisconnect:)) {
  return;
}

@end
