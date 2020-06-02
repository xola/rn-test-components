#import "XolaAPIClient.h"
#import "TokenProvider.h"

@implementation XolaAPIClient

+ (XolaAPIClient*) shared {
  static dispatch_once_t onceToken;
  static XolaAPIClient* _shared = nil;
  dispatch_once(&onceToken, ^{
    _shared = [[self alloc] init];
  });
  return _shared;
}

// Fetches a ConnectionToken from your backend
- (void)fetchConnectionToken:(SCPConnectionTokenCompletionBlock)completion {
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration:config];
  NSString *sellerApiKey = TokenProvider.getInstance.apiKey;
  NSString *sellerId = TokenProvider.getInstance.sellerId;
  NSString *domain = TokenProvider.getInstance.domain;
  NSString *strUrl = [NSString stringWithFormat:@"%@api/sellers/%@/stripeTerminal/connectionToken",domain,sellerId];
  NSURL *url = [NSURL URLWithString:strUrl];
  if (!url) {
    NSAssert(NO, @"Invalid backend URL");
  }
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
  request.HTTPMethod = @"GET";
  [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
  [request addValue:@"application/json" forHTTPHeaderField:@"Accept"];
  
  [request addValue:sellerApiKey forHTTPHeaderField:@"X-API-KEY"];
  NSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
    id jsonObject = nil;
    NSError *jsonSerializationError;
    if (data) {
      NSString *strData = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
      NSLog(@"%@", data);
      jsonObject = [NSJSONSerialization JSONObjectWithData:data options:(NSJSONReadingOptions)kNilOptions error:&jsonSerializationError];
    }
    else {
      NSError *error = [NSError errorWithDomain:@"com.stripe-terminal-ios.example"
                                           code:1000
                                       userInfo:@{NSLocalizedDescriptionKey: @"No data in response from ConnectionToken endpoint"}];
      completion(nil, error);
    }
    if (!(jsonObject && [jsonObject isKindOfClass:[NSDictionary class]])) {
      completion(nil, jsonSerializationError);
      return;
    }
    NSDictionary *json = (NSDictionary *)jsonObject;
    id secret = json[@"secret"];
    if (!(secret && [secret isKindOfClass:[NSString class]])) {
      NSError *error = [NSError errorWithDomain:@"com.stripe-terminal-ios.example"
                                           code:2000
                                       userInfo:@{NSLocalizedDescriptionKey: @"Missing `secret` in ConnectionToken JSON response"}];
      completion(nil, error);
      return;
    }
    completion((NSString *)secret, nil);
  }];
  [task resume];
}


// ...

@end

