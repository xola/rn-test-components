import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const listSize = variables.fullWidth - 30;
const itemSize = listSize / 3;

const styles = StyleSheet.create({
    item: {
        width: itemSize,
        padding: 10,
    },
    image: {
        width: itemSize - 20,
        height: itemSize - 50,
    },
    name: {
        marginTop: 10,
    },
    price: {
        marginBottom: 10,
    },
    icon: {
        width: 30,
    },
    infoText: {
        lineHeight: 25,
    },
    description: {
        minHeight: 170,
        fontSize: 12,
    },
    demographicsContainer: {
        height: 80,
    },
    demographics: {
        marginTop: 10,
        paddingTop: 10,
        borderStyle: 'solid',
        borderTopColor: variables.textColorMuted,
        borderTopWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default styles;
