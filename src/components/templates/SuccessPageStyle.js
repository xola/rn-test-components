import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
