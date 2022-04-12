import { StyleSheet } from 'react-native';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingVertical: w(67),
    },
    logo: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        paddingTop: w(96),
        width: w(490),
        height: w(490),
        borderRadius: w(8),
        resizeMode: 'contain',
    },
    actions: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: w(80)
    },
});

export default styles;
