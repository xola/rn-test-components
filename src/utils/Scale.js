import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');
const designWidth = 1000;
const designHeight = 2100;

export const w = (input) => {
    return input / designWidth * width;
}

export const h = (input) => {
    return input / designHeight * height;
}
