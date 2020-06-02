//
//  TokenProvider.h
//  nativeKiosk
//
//  Created by Nemanja Savic on 9/21/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TokenProvider : NSObject {
  NSString *apiKey;
  NSString *sellerId;
  NSString *domain;
}

@property(nonatomic,retain)NSString *apiKey;
@property(nonatomic,retain)NSString *sellerId;
@property(nonatomic,retain)NSString *domain;
+(TokenProvider*)getInstance;

@end

NS_ASSUME_NONNULL_END
