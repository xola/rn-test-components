import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        padding: w(10),
        display: 'flex',
        alignItems: 'center',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    description: {
        fontSize: w(20),
        fontFamily: variables.fontLight,
        color: variables.textColor
    },
});

export default styles;
