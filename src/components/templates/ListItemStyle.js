import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const listSize = variables.fullWidth - 30;
const itemSize = listSize / 3;

const styles = StyleSheet.create({
    image: {
        width: w(170),
        height: w(127),
        borderRadius: w(12),
        borderColor: variables.lightGrey,
        borderWidth: 1,
    },
    flex: {
        flex: 1,
    },
    name: {
        fontFamily: variables.fontBold,
        fontSize: variables.h5Size,
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
        alignItems: 'center',
    },
    content: {
        flexWrap: 'wrap',
        paddingHorizontal: w(24),
        flex: 1,
        justifyContent: 'space-between',
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
        marginTop: w(8),
    },
    title: {
        fontFamily: variables.fontBold,
        fontSize: variables.h6Size,
        color: variables.titleText,
    },
    demographics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 4,
        fontSize: 20,
    },
    infoText: {
        color: '#505254'
    }
});

export default styles;
