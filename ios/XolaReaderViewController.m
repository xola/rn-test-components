#import "XolaReaderViewController.h"

@implementation XolaReaderViewController

// Action for a "Connect Reader" button
- (void)connectReaderAction:(NSString *)locationId {
  SCPDiscoveryConfiguration *config = [[SCPDiscoveryConfiguration alloc] initWithDiscoveryMethod:SCPDiscoveryMethodBluetoothScan simulated:YES];

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
  SCPBluetoothConnectionConfiguration *config = [[SCPBluetoothConnectionConfiguration alloc] initWithLocationId:selectedReader.locationId];
  [[SCPTerminal shared] connectBluetoothReader:selectedReader delegate:self connectionConfig:config completion:^(SCPReader * _Nullable reader, NSError * _Nullable error) {
    if (reader != nil) {
      NSLog(@"Successfully connected to reader: %@", reader);
    }
    else {
      NSLog(@"connectReader failed: %@", error);
    }
  }];
}

- (void)terminal:(SCPTerminal *)terminal didReportUnexpectedReaderDisconnect:(SCPReader *)reader {
  
  return;
}

- (void)reader:(nonnull SCPReader *)reader didFinishInstallingUpdate:(nullable SCPReaderSoftwareUpdate *)update error:(nullable NSError *)error {
  
}

- (void)reader:(nonnull SCPReader *)reader didReportAvailableUpdate:(nonnull SCPReaderSoftwareUpdate *)update {
  
}

- (void)reader:(nonnull SCPReader *)reader didReportReaderSoftwareUpdateProgress:(float)progress {
  
}

- (void)reader:(nonnull SCPReader *)reader didRequestReaderDisplayMessage:(SCPReaderDisplayMessage)displayMessage {
  
}

- (void)reader:(nonnull SCPReader *)reader didRequestReaderInput:(SCPReaderInputOptions)inputOptions {
  
}

- (void)reader:(nonnull SCPReader *)reader didStartInstallingUpdate:(nonnull SCPReaderSoftwareUpdate *)update cancelable:(nullable SCPCancelable *)cancelable {
  
}


@end
