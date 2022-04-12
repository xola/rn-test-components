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
});
export default styles;
