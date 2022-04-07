import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        padding: w(12),
        borderWidth: w(1),
        borderColor: variables.lightGrey,
        borderRadius: variables.borderRadius,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        margin: w(8),
    },
    image: {
        width: w(170),
        height: w(128),
        borderRadius: variables.borderRadius,
        borderWidth: w(1),
        borderColor: variables.lightGrey,
        resizeMode: 'contain'
    },
    text: {
        fontSize: variables.h6Size,
        paddingHorizontal: w(32),
        fontFamily: variables.fontBold,
        width: w(400)
    }
});

export default styles;
