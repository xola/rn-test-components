import { StyleSheet } from 'react-native';
import {h, w} from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        width: w(700),
        alignSelf: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    flex: {
        flex: 1,
    },
    top: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: h(300)
    },
    brandText: {
    },
    image: {
        width: w(94),
        height: w(33),
    },
    kioskLogo: {
        width: w(102),
        height: w(102),
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    bottomContainer: {
        flexGrow: 0.5,
        justifyContent: 'space-evenly',
    },
    loginForm: {
        flexGrow: 0.5,
        justifyContent: 'center',
    }
});
export default styles;
