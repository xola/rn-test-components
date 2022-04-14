import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
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
    searchInput: {
        fontWeight: '400',
        fontSize: 19,
        color: '#505254',
        height: 75,
        marginVertical: 0,
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
        width: 470,
        overflow: 'hidden',
    },
    alertIcon: {
        fontSize: variables.fontSize,
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 31,
        color: '#222324',
    },
    underline: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
    },
    title: {
        fontWeight: '700',
        fontSize: 42,
        marginTop: 25,
        paddingBottom: 17,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    form: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 70,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default styles;
