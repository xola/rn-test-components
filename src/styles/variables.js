import { Dimensions } from 'react-native';
import { w } from '../utils/Scale';

const variables = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width,
    blue: '#25AAE2',
    lightGreen: '#87c03d',
    lightGrey: "#E0E3E7",
    btnPaddingY: 10,
    btnPaddingX: 5,
    grayBase: '#000',
    lightestGray: '#eee',
    white: '#fff',
    green: '#46a546',
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
    progressBar: '#ddd',
    textModal: '#222324',

    borderColorMuted: '#DBDBDB',
    borderRadius: w(12),

    fontBold: 'Inter-Bold',
    fontLight: 'Inter-Light',
    fontSize: w(16),
    largeText: w(64),
    h1Size: w(42),
    h2Size: w(38),
    h3Size: w(34),
    h4Size: w(30),
    h5Size: w(26),
    h6Size: w(22),
    fontSmall: w(20),
    fontBig: w(26),

    linkButton: '#80b0e4',
};

export default variables;
