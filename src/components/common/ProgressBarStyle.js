import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    steps: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    step: {
        flex: 1,
        textAlign: 'center',
    },
    activeStep: {
        flex: 1,
        color: variables.blue,
        textAlign: 'center',
    },
    stepIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: variables.white,
    },
    activeStepIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: variables.blue,
    },
    progressStep: {
        width: 165,
        height: 5,
        backgroundColor: variables.white,
    },
    activeProgressStep: {
        width: 165,
        height: 5,
        backgroundColor: variables.blue,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
});

export default styles;
