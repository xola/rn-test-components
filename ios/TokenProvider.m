//
//  TokenProvider.m
//  nativeKiosk
//
//  Created by Nemanja Savic on 9/21/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TokenProvider.h"

@implementation TokenProvider
@synthesize apiKey;
@synthesize sellerId;
@synthesize domain;

static TokenProvider *instance = nil;
+(TokenProvider *)getInstance
{
  @synchronized(self)
  {
    if(instance==nil)
    {
      instance= [TokenProvider new];
    }
  }
  return instance;
}
@end
