import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: variables.lightGrey,
        borderBottomWidth: 1,
        height: w(130),
        backgroundColor: variables.white,
        paddingHorizontal: w(66),
        paddingTop: w(20)
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
        flexDirection: 'row'
    },
    forward: {
        flex: 1,
        alignItems: 'flex-end'
    },
    next: {
        paddingVertical: w(23),
        paddingHorizontal: w(27),
        borderRadius: w(10),
        borderColor: variables.white,
        backgroundColor: variables.mainBlue,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    nextText: {
        fontFamily: variables.fontBold,
        fontSize: w(22),
        color: variables.white,
        paddingRight: w(16)
    },
    steps: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    step: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    stepCount: {
        width: w(26),
        height: w(26),
        borderRadius: w(26),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: w(8)
    },
    stepText: {
        fontFamily: variables.fontBold,
        fontSize: w(16),
        color: variables.darkGrey
    },
    separator: {
        justifyContent: 'center',
    },
    separatorLine: {
        marginHorizontal: w(10),
        backgroundColor: variables.lightGrey,
        width: w(20),
        height: w(2),
    }
});

export default styles;
