import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: w(40)
    },
    content: {
        justifyContent: 'space-evenly',
    },
    title: {
        paddingTop: w(60),
        fontSize: variables.h3Size,
        fontFamily: variables.fontBold
    },
    subtitle: {
        paddingTop: w(12),
        fontSize: variables.fontSize,
        fontFamily: variables.fontLight
    },
    back: {
        paddingVertical: w(23),
        paddingHorizontal: w(27),
        borderRadius: w(10),
        borderColor: variables.lightGrey,
        backgroundColor: variables.white,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: w(100),
        flexDirection: 'row',
        position: 'absolute',
        right: w(0),
        top: w(20),
        zIndex: 999,
    },
});
export default styles;
