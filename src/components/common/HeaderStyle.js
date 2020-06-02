import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    back: {
        flex: 1,
    },
    backIcon: {
        color: variables.textColorMuted,
    },
    forward: {
        flex: 1,
    },
    steps: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default styles;
