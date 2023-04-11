import React, { Component } from 'react';
import { ScrollView, Image, View, Linking, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { setEnvironment } from '../../actions/bootstrapActions';
import { Formik } from 'formik';
import LoadingButton from '../common/LoadingButton';
import styles from './HomeStyle';
import userSchema from '../../schemas/userSchema';
import logo from '../../images/xola-logo.png';
import Layout from '../common/Layout';
import FormGroup from '../common/FormGroup';
import StyledText from '../common/StyledText';
import { PRIVACY_POLICY_URL, SIGN_UP_URL } from '../../constants/externalUrlConstants';
import { w } from '../../utils/Scale';

class LogIn extends Component {

    onLogInClick = async params => {
        console.log("Take Login Action");
    };

    openSignUp = () => {
        console.log("Leaving app to go to signup URL")
        Linking.openURL(SIGN_UP_URL);
    };

    render() {
        return (
            <View
                style={{ flex: 1 }}
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
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                                keyboardShouldPersistTaps="handled"
                            >
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} style={styles.flex}>
                                    <View style={styles.top}>
                                        <Image style={styles.image} source={logo} />
                                        <StyledText styleNames={['large']} style={styles.brandText}>React Native Test Environment</StyledText>
                                    </View>
                                    <View style={styles.loginForm}>
                                        <TextInput
                                            id="sampleField"
                                            title="Form field"
                                            onChangeText={props.handleChange('sampleField')}
                                            keyboardType="default"
                                            error={props.errors.sampleField}
                                        />
                                    </View>
                                    <FormGroup style={styles.flex}>
                                        <View style={styles.bottomContainer}>

                                            <View style={styles.buttonContainer}>
                                                <LoadingButton
                                                    styleNames={['large', 'neutral', 'flex']}
                                                    title="Regular button"
                                                />
                                                <LoadingButton
                                                    onPress={props.handleSubmit}
                                                    styleNames={['large', 'active', 'flex']}
                                                    title="Primary Button"
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
    setEnvironment,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogIn);
