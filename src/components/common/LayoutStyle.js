import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: variables.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: w(67)
    },
    header: {
        flex: 1,
        padding: 15,
        backgroundColor: variables.lightestGray,
    },
    main: {
        flex: 7,
    },
    footer: {
        padding: 15,
    },
    noPadding: {
        padding: 0,
    },
});

export default styles;
