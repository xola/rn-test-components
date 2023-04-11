import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    name: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,
    },
    info: {
        flex: 3,
        paddingLeft: w(20),
        lineHeight: 20,
        alignSelf: 'center',
    },
    infoText: {
        fontSize: variables.fontSmall,
        fontFamily: variables.fontLight,
        paddingLeft: w(4)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: w(1)
    }
});

export default styles;
