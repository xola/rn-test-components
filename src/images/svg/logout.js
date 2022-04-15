import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            d="M10 25V30C10 31.3261 10.5268 32.5979 11.4645 33.5355C12.4021 34.4732 13.6739 35 15 35H30C31.3261 35 32.5979 34.4732 33.5355 33.5355C34.4732 32.5979 35 31.3261 35 30V10C35 8.67392 34.4732 7.40215 33.5355 6.46447C32.5979 5.52678 31.3261 5 30 5H15C13.6739 5 12.4021 5.52678 11.4645 6.46447C10.5268 7.40215 10 8.67392 10 10V15"
            stroke="#222324"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path d="M20 25L25 20L20 15" stroke="#222324" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M5 20H25" stroke="#222324" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
);

export default SvgComponent;
