import styles from './FormGroupStyle';
import { View } from 'react-native';
import React from 'react';

const FormGroup = ({ style, ...rest }) => {
    return <View style={{ ...styles.container, ...style }} {...rest} />;
};

export default FormGroup;
