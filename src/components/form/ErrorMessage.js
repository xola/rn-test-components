import { connect, getIn } from 'formik';
import React from 'react';
import { Text } from 'react-native';
import variables from '../../styles/variables';

const ErrorMessage = ({ name, formik }) => {
    const error = getIn(formik.errors, name);
    const isSubmitted = formik.submitCount > 0;
    return isSubmitted && error ? <Text style={{ color: variables.redError, paddingVertical: 2 }}>{error}</Text> : null;
};

export default connect(ErrorMessage);
