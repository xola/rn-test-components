import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 23,
        backgroundColor: variables.mainBlue,
        marginLeft: 12,
    },
    loadingButton: {
        textAlign: 'center',
        backgroundColor: variables.mainBlue,
        borderRadius: w(12),
        overflow: 'hidden',
        color: variables.white,
    },
});

export default styles;
