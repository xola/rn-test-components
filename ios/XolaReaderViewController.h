@import UIKit;
#import <StripeTerminal/StripeTerminal.h>

@interface XolaReaderViewController : UIViewController <SCPDiscoveryDelegate, SCPTerminalDelegate>

@property (nonatomic, nullable, strong) SCPCancelable *discoverCancelable;

@end
