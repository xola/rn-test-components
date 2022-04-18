import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: w(24),
        borderStyle: 'solid',
        borderRadius: variables.borderRadius,
        borderColor: variables.lightGrey,
        borderWidth: 1,
        height: w(80),
        margin: w(8),
        alignItems: 'center',
        flex: 1
    },
    time: {
        flex: 1,
        fontSize: w(20),
        fontFamily: variables.fontBold,
    },
    slots: {
        flex: 1,
        fontSize: w(20),
        fontFamily: variables.fontLight,
        textAlign: 'right',
    },
});

export default styles;
