import { StyleSheet } from 'react-native';
import {h, w} from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: w(50)
    },
    flex: {
        flex: 1,
    },
    top: {
        alignItems: 'center',
        justifyContent: 'space-around',
        //height: h(350)
    },
    brandText: {
        paddingTop: w(40),
        textAlign: 'center'
    },
    image: {
        width: w(282),
        height: w(99),
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
