import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingVertical: w(67),
    },
    logo: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        paddingTop: w(96),
        width: w(490),
        height: w(490),
        borderRadius: w(8),
        resizeMode: 'contain',
    },
    actions: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: w(80)
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
        marginRight: w(60),
        width: w(100),
        flexDirection: 'row',
        position: 'absolute',
        left: w(20),
        top: w(20),
        zIndex: 999,
    },
});

export default styles;
