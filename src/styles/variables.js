import { Dimensions, Platform } from 'react-native';
import { w } from '../utils/Scale';

const variables = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width,
    blue: '#25AAE2',
    lightBlue: '#D1E1FF',
    lightGreen: '#C1F9D9',
    grey: "#F0F2F4",
    lightGrey: "#E0E3E7",
    darkGrey: '#8A8C91',
    titleText: "#333743",
    btnPaddingY: 10,
    btnPaddingX: 5,
    grayBase: '#000',
    lightestGray: '#eee',
    white: '#fff',
    green: '#27CE70',
    yellow: '#ffc40d',
    yellowLight: '#fef9db',
    yellowText: '#edcd92',

    brandSuccess: '#8BC540',
    brandSuccessDisabled: '#c5e29f',
    brandPrimary: '#25AAE2',
    brandInfo: '#5bc0de',
    brandWarning: '#F2B53A',
    brandDanger: '#DC5D42',
    redBright: '#fa3d18',
    redError: '#DC5D42',
    modalBackColor: '#00000070',
    mainBlue: '#1352C6',

    textColor: '#222324',
    textColorMuted: '#999',
    textModal: '#222324',

    borderColorMuted: '#DBDBDB',
    borderRadius: w(12),

    fontBold: Platform.OS === 'ios' ? 'Arial-BoldMT' : 'Bold',
    fontLight: Platform.OS === 'ios' ? 'Arial' : 'Light',
    fontSize: w(12),
    largeText: w(16),
    h1Size: w(30),
    h2Size: w(28),
    h3Size: w(26),
    h4Size: w(24),
    h5Size: w(22),
    h6Size: w(20),
    fontSmall: w(10),
    fontBig: w(14),

    linkButton: '#80b0e4',
};

export default variables;
