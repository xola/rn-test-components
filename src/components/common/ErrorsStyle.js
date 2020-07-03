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
        fontSize: 22,
        color: variables.white,
    },
    error: {
        fontSize: 17,
        color: variables.white,
        margin: 10,
    },
    wrapper: {
        padding: 30,
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: variables.redBright,
        backgroundColor: variables.redError,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        borderRadius: 30,
    },
    button: {
        alignSelf: 'center',
    },
});

export default styles;
