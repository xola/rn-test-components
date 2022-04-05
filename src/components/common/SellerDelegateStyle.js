import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        padding: w(12),
        borderWidth: w(1),
        borderColor: variables.lightGrey,
        borderRadius: variables.borderRadius,
        marginTop: w(24),
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: w(170),
        height: w(128),
        borderRadius: w(12),
        resizeMode: 'contain'
    },
    text: {
        fontSize: variables.h6Size,
        paddingHorizontal: w(32),
        fontFamily: variables.fontBold,
    }
});

export default styles;
