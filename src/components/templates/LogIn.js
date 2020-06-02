import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/authActions';
import { Formik } from 'formik';
import ErrorMessage from '../form/ErrorMessage';
import LoadingButton from '../common/LoadingButton';
import styles from './LogInStyle';
import userSchema from '../../schemas/userSchema';
import logo from '../../images/xola-logo.png';
import Layout from '../common/Layout';
import FormGroup from '../common/FormGroup';

class LogIn extends Component {
    onLogInClick = async params => {
        await this.props.authenticateUser(params);
    };

    render() {
        return (
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={userSchema}
                onSubmit={this.onLogInClick}
            >
                {props => (
                    <Layout>
                        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
                            <Image style={styles.image} source={logo} />

                            <FormGroup>
                                <TextInput
                                    id="username"
                                    onChangeText={props.handleChange('username')}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                />

                                <ErrorMessage name="username" />
                            </FormGroup>

                            <FormGroup>
                                <TextInput
                                    id="password"
                                    onChangeText={props.handleChange('password')}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                />

                                <ErrorMessage name="password" />
                            </FormGroup>

                            <LoadingButton
                                onPress={props.handleSubmit}
                                isLoading={this.props.auth.isLoading}
                                styleNames={['medium', 'success']}
                                title="Log In"
                            />
                        </ScrollView>
                    </Layout>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    authenticateUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogIn);
