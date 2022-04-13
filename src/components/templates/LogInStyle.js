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
        paddingVertical: w(60),
        flex: 1
    },
    brandText: {
        textAlign: 'center',
        paddingTop: (20)
    },
    image: {
        width: w(94),
        height: w(33),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    buttonContainer: {
        paddingTop: w(60),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    }
});
export default styles;
