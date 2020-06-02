import { TextInput as NativeTextInput } from 'react-native';
import styles from './TextInputStyle';
import React from 'react';
import variables from '../../styles/variables';

const TextInput = ({ style, ...rest }) => {
    return (
        <NativeTextInput
            style={{ ...styles.container, ...style }}
            placeholderTextColor={variables.textColorMuted}
            autoCorrect={false}
            autoCapitalize="none"
            {...rest}
        />
    );
};

export default TextInput;
