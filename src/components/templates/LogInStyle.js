import { StyleSheet } from 'react-native';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        width: w(700),
        alignSelf: 'center',
    },
    flex: {
        flex: 1
    },
    logo: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(40)
    },
    brandText: {
        paddingLeft: w(30)
    },
    image: {
        width: w(94),
        height: w(33),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    actions: {
        flex: 1,
    },
});
export default styles;
