import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '30%',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignSelf: 'center',
    },
    image: {
        width: variables.fullWidth * 0.3,
        height: variables.fullHeight * 0.3,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    placeholderColor: {
        color: variables.textColorMuted,
    },
    notices: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    notice: {
        padding: 15,
        marginTop: 20,
        width: 500,
        fontSize: variables.fontSize,
        borderStyle: 'solid',
        textAlign: 'center',
        color: variables.white,
        borderRadius: 5,
        alignSelf: 'center',
    },
    alert: {
        backgroundColor: variables.brandWarning,
        borderRadius: variables.borderRadius,
        overflow: 'hidden',
    },
    alertIcon: {
        fontSize: variables.fontSize,
    },
});

export default styles;
