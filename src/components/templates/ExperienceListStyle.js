import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const listSize = variables.fullWidth - 30;
const itemSize = listSize / 3;

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: listSize,
    },
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
        marginBottom: 5,
    },
    button: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    description: {
        color: variables.textColor,
        minHeight: 150,
    },
    price: {
        marginBottom: 10,
    },
});

export default styles;
