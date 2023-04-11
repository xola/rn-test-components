import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');
const designWidth = width; // 1000;
const designHeight = height; // 2100;

export const w = (input) => {
    return input / designWidth * width;
}

export const h = (input) => {
    return input / designHeight * height;
}
