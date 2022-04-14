import { StyleSheet } from 'react-native';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10,
    },
    button: {
        position: 'absolute',
        bottom: w(40),
        left: 0,
        alignItems: 'center',
        width: '100%'
    },
});

export default styles;
