import { StyleSheet } from 'react-native';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        width: w(700),
        alignSelf: 'center',
    },
    flex: {
        flex: 1,
    },
    brand: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(10),
        flex: 1
    },
    brandText: {
        textAlign: 'center',
        paddingTop: (10)
    },
    image: {
        width: w(94),
        height: w(33),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    kioskLogo: {
        width: w(102),
        height: w(102),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    }
});
export default styles;
