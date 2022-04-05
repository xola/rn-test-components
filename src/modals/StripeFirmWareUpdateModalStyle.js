import { StyleSheet } from 'react-native';
import variables from '../styles/variables';

const styles = StyleSheet.create({
    container: {
        width: variables.fullWidth,
        height: variables.fullHeight,
        backgroundColor: variables.modalBackColor,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    modalContainer: {
        backgroundColor: variables.white,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: variables.grayBase,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        borderRadius: 8,
        width: 400,
        padding: 40
    },
    footer: {
        flexDirection: 'row-reverse',
        backgroundColor: variables.lightestGray,
    },
    buttons: {
        flexDirection: 'row-reverse',
    },
    title: {
        fontSize: variables.h2Size,
        lineHeight: 32,
        color: variables.textModal,
        textAlign: 'center',
        fontWeight: '700'
    },
    subTitle: {
        fontSize: variables.h5Size,
        color: variables.textModal,
        marginVertical: 32,
        lineHeight: 21,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 11,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: variables.lightGrey
    },
    buttonText: {
        color: variables.white,
        fontWeight: "700",
    }
});

export default styles;
