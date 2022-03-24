@import UIKit;
#import <StripeTerminal/StripeTerminal.h>

@interface XolaReaderViewController : UIViewController <SCPDiscoveryDelegate, SCPTerminalDelegate, SCPBluetoothReaderDelegate>

@property (nonatomic, nullable, strong) SCPCancelable *discoverCancelable;

@end
