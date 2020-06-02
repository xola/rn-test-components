import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: variables.borderColorMuted,
        borderRadius: variables.borderRadius,
        padding: 10,
        color: variables.textColor,
        fontSize: variables.fontSize,
    },
});

export default styles;
