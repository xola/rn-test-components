import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',

        paddingLeft: '25%',
        paddingRight: '25%',
        paddingTop: '10%',
    },
    content: {
        justifyContent: 'space-evenly',
    },
    title: {
        alignSelf: 'center',
        paddingTop: '10%',
    },
    subtitle: {
        alignSelf: 'center',
        marginTop: 20,
    },
});
export default styles;
