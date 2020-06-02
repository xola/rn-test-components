import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        padding: 15,
        backgroundColor: variables.lightestGray,
    },
    main: {
        flex: 7,
        padding: 15,
    },
    footer: {
        padding: 15,
    },
    noPadding: {
        padding: 0,
    },
});

export default styles;
