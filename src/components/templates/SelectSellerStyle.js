import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: '10%',
    },
    content: {
        justifyContent: 'space-evenly',
    },
    title: {
        paddingTop: '10%',
        fontSize: variables.h3Size,
        fontFamily: variables.fontBold
    },
    subtitle: {
        marginTop: w(12),
        fontSize: variables.fontSize,
        fontFamily: variables.fontLight
    },
});
export default styles;
