import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        paddingLeft: '25%',
        paddingRight: '25%',
    },
    logo: {
        flex: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image: {
        width: variables.fullWidth * 0.3,
        height: variables.fullHeight * 0.3,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    title: {
        fontSize: 30,
    },
    actions: {
        flex: 1,
    },
});
export default styles;
