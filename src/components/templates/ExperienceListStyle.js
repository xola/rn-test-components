import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    image: {
        width: w(170),
        height: w(127),
        borderRadius: w(12),
        borderColor: variables.lightGrey,
        borderWidth: 1,
    },
    name: {
        fontFamily: variables.fontBold,
        fontSize: variables.h6Size,
        color: variables.titleText,
    },
    button: {
        flexDirection: 'row',
        padding: w(12),
        borderColor: variables.lightGrey,
        backgroundColor: variables.white,
        borderWidth: 1,
        borderRadius: w(12),
        flexWrap: 'wrap',
        marginBottom: w(12),
        alignItems: 'center'
    },
    content: {
        width: w(820),
        flexWrap: 'wrap',
        paddingHorizontal: w(48),
    },
    description: {
        fontFamily: variables.fontLight,
        fontSize: w(18),
        color: variables.titleText,
        marginTop: w(20),
        width: w(800),
    },
    priceContainer: {
        backgroundColor: variables.grey,
        borderRadius: w(80),
        paddingHorizontal: w(4),
        paddingVertical: w(8),
        flexDirection: 'row',
        justifyContent: 'center',
        width: w(200),
        marginTop: w(8)
    },
    price: {
        fontFamily: variables.fontLight,
        fontSize: w(20),
    },
});

export default styles;
