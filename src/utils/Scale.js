import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');
const designWidth = 1194;
const designHeight = 834;

export const w = (input) => {
    return input / designWidth * width;
}

export const h = (input) => {
    return input / designHeight * height;
}
