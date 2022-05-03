import { StyleSheet } from 'react-native';
import { w } from '../../utils/Scale';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: variables.lightGrey,
        borderBottomWidth: 1,
        height: w(130),
        backgroundColor: variables.white,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: w(130),
    },
    row: {
        position: 'absolute',
        bottom: w(40),
        left: 0,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;
