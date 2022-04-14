import { View, Text, TextInput as NativeTextInput } from 'react-native';
import styles from './TextInputStyle';
import React from 'react';
import variables from '../../styles/variables';

const TextInput = ({ style, title, error, ...rest }) => {
    return (
        <>
            {Boolean(error) ? <Text style={styles.error}>{error}</Text> : title && <Text style={styles.label}>{title}</Text>}
            <NativeTextInput
                style={{ ...styles.container, ...style, borderColor: Boolean(error) ? variables.redError : variables.lightGrey }}
                placeholderTextColor={variables.textColorMuted}
                autoCorrect={false}
                autoCapitalize="none"
                {...rest}
            />
        </>
    );
};

export default TextInput;
