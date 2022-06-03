import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Root from './src/components/Root';
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en';

AppRegistry.registerComponent('nativeKiosk', () => Root);
