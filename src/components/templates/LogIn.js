import React, { Component } from 'react';
import {ScrollView, Image, View, Linking, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/authActions';
import { setEnvironment } from '../../actions/bootstrapActions';
import { Formik } from 'formik';
import LoadingButton from '../common/LoadingButton';
import styles from './LogInStyle';
import userSchema from '../../schemas/userSchema';
import logo from '../../images/xola-logo.png';
import kioskLogo from '../../images/kiosk.png';
import Layout from '../common/Layout';
import FormGroup from '../common/FormGroup';
import StyledText from '../common/StyledText';
import { PRIVACY_POLICY_URL, SIGN_UP_URL } from '../../constants/externalUrlConstants';
import { w } from '../../utils/Scale';

class LogIn extends Component {
    state = {
        touches: 0
    }

    timer = React.createRef();

    detectTouch = () => {
        this.setState(prevState => ({ touches: prevState.touches + 1 }));
        clearInterval(this.timer.current);
        this.timer.current = setTimeout(() => {
            this.setState({ touches: 0 });
        }, 1000);
    }

    onLogInClick = async params => {
        await this.props.authenticateUser(params);
    };

    openSignUp = () => {
        Linking.openURL(SIGN_UP_URL);
    };

    openPrivacy = () => {
        Linking.openURL(PRIVACY_POLICY_URL);
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.touches !== prevState.touches && this.state.touches === 5) {
            const isProd = this.props.bootstrap.environment === 'production';
            Alert.alert(`Environment is changed to ${isProd ? 'sandbox' : 'production'}`);
            this.props.setEnvironment(`${isProd ? 'sandbox' : 'production'}`);
            this.setState({ touches: 0 });
            clearTimeout(this.timer.current);
        }
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}
                onResponderRelease={this.detectTouch}
                onStartShouldSetResponder={() => true}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={userSchema}
                    onSubmit={this.onLogInClick}
                >
                    {props => (
                        <Layout>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={{flex: 1}}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                                keyboardShouldPersistTaps="handled"
                            >
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} style={styles.flex}>
                                    <View style={styles.top}>
                                        <Image style={styles.image} source={logo} />
                                        <Image style={styles.kioskLogo} source={kioskLogo} />
                                        <View style={styles.brand}>
                                            <StyledText styleNames={['large']} style={styles.brandText}>Xola Kiosk</StyledText>
                                        </View>
                                    </View>
                                    <View style={styles.loginForm}>
                                        <TextInput
                                            id="username"
                                            title="E-mail"
                                            onChangeText={props.handleChange('username')}
                                            keyboardType="email-address"
                                            error={props.errors.username}
                                        />

                                        <TextInput
                                            id="password"
                                            title="Password"
                                            onChangeText={props.handleChange('password')}
                                            secureTextEntry={true}
                                            error={props.errors.password}
                                        />
                                    </View>
                                    <FormGroup style={styles.flex}>
                                        <View style={styles.bottomContainer}>

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
                                            <View style={styles.buttonContainer}>
                                                <LoadingButton
                                                    onPress={() => this.openPrivacy()}
                                                    styleNames={['large', 'link', 'flex']}
                                                    title="Privacy Policy"
                                                />
                                            </View>
                                        </View>
                                    </FormGroup>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </Layout>
                    )}
                </Formik>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    bootstrap: state.bootstrap,
});

const mapDispatchToProps = {
    authenticateUser,
    setEnvironment,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogIn);
