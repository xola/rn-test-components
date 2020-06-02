import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
    },
    title: {
        fontSize: 25,
        color: variables.white,
    },
    error: {
        fontSize: 20,
        color: variables.white,
        margin: 10,
    },
    wrapper: {
        padding: 10,
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: variables.redBright,
        backgroundColor: variables.redError,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default styles;
