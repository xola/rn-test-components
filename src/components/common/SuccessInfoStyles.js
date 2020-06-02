import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        height: '50%',
        width: '50%',
        marginTop: '5%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    icon: {
        padding: 30,
        borderRadius: 44,
        overflow: 'hidden',
        backgroundColor: variables.brandSuccessDisabled,
        borderColor: variables.brandSuccess,
        color: variables.brandSuccess,
        borderWidth: 1,
        borderStyle: 'solid',
    },
});

export default styles;
