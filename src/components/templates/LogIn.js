import React, { Component } from 'react';
import { ScrollView, Image, View, Linking } from 'react-native';
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
import StyledText from '../common/StyledText';
import { KioskAppIcon } from '../../images/svg'
import { PRIVACY_POLICY_URL, SIGN_UP_URL } from '../../constants/externalUrlConstants';

class LogIn extends Component {
    onLogInClick = async params => {
        await this.props.authenticateUser(params);
    };

    openSignUp = () => {
        Linking.openURL(SIGN_UP_URL)
    }

    openPrivacy = () => {
        Linking.openURL(PRIVACY_POLICY_URL)
    }

    render() {
        return (
            <Formik
                initialValues={{ username: 'sandbox+crowdbotics@xola.com', password: 'Crowdbotics&Xola' }}
                validationSchema={userSchema}
                onSubmit={this.onLogInClick}
            >
                {props => (
                    <Layout>
                        <Image style={styles.image} source={logo} />
                        <View keyboardShouldPersistTaps="handled" style={styles.container}>
                            <View style={styles.brand}>
                                <KioskAppIcon />
                                <StyledText styleNames={['large']} style={styles.brandText}>Xola Kiosk</StyledText>
                            </View>
                            <FormGroup style={styles.flex}>
                                <TextInput
                                    id="username"
                                    title="E-mail"
                                    onChangeText={props.handleChange('username')}
                                    onSubmitEditing={props.handleSubmit}
                                    keyboardType="email-address"
                                />

                                <ErrorMessage name="username" />

                                <TextInput
                                    id="password"
                                    title="Password"
                                    onChangeText={props.handleChange('password')}
                                    onSubmitEditing={props.handleSubmit}
                                    secureTextEntry={true}
                                />
                                <ErrorMessage name="password" />
                            </FormGroup>
                            <FormGroup style={styles.flex}>
                                <View style={styles.buttonContainer}>
                                    <LoadingButton
                                        onPress={() => this.openSignUp()}
                                        styleNames={['large', 'neutral', 'flex']}
                                        title="Not a Xola customer?"
                                    />
                                    <LoadingButton
                                        onPress={props.handleSubmit}
                                        isLoading={this.props.auth.isLoading}
                                        styleNames={['large', 'active', 'flex']}
                                        title="Login"
                                    />
                                </View>
                                <LoadingButton
                                    onPress={() => this.openPrivacy()}
                                    styleNames={['large', 'link', 'flex']}
                                    title="Privacy Policy"
                                />
                            </FormGroup>
                        </View>
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
