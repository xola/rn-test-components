import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: variables.borderColorMuted,
        borderRadius: variables.borderRadius,
    },
    label: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
    },
});

export default styles;
