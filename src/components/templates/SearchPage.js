import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { Formik } from 'formik';
import ErrorMessage from '../form/ErrorMessage';
import IconButton from '../common/IconButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './SearchPageStyle';
import searchSchema from '../../schemas/searchSchema';
import TextInput from '../common/TextInput';
import { resetEmptySearchResult } from '../../actions/orderActions';
import Icon from 'react-native-vector-icons/AntDesign';
import NavigationService from '../NavigationService';
import StyledText from '../common/StyledText';

class SearchPage extends Component {
    componentDidMount() {
        this.props.resetEmptySearchResult();
    }

    handleNoBookingDetails() {
        NavigationService.navigate('SelectExperience', {
            selectExperienceForSigningWaiver: true,
        });
    }

    render() {
        return (
            <Formik
                initialValues={{ searchText: '' }}
                onSubmit={this.props.onSearchClick}
                validationSchema={searchSchema}
            >
                {props => (
                    <>
                        <Header back={true} steps={['Search', 'Select Reservation', 'Sign Waiver']} currentStep={1} />
                        <Layout>
                            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                                <View style={styles.steps}>
                                    {this.props.title ? (
                                        <StyledText styleNames={['h1']} style={styles.title}>
                                            {this.props.title}
                                        </StyledText>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.form}>
                                        <View style={{ flex: 1 }}>
                                            <TextInput
                                                id="searchText"
                                                onChangeText={props.handleChange('searchText')}
                                                onSubmitEditing={props.handleSubmit}
                                                placeholder="Organizer name, email, phone or last 4 of your booking ID"
                                                style={styles.searchInput}
                                            />
                                            <ErrorMessage name="searchText" />
                                        </View>
                                        <IconButton
                                            isLoading={this.props.order.isLoading}
                                            styleNames={['large']}
                                            title="SEARCH"
                                            onPress={props.handleSubmit}
                                        />
                                        
                                    </View>
                                    
                                </View>

                                {this.props.order.isEmpty ? (
                                    <View style={styles.notices}>
                                        <Text style={[styles.notice, styles.alert]}>
                                            <Icon style={styles.alertIcon} name="warning" /> No bookings were found
                                            matching your search
                                        </Text>
                                    </View>
                                ) : null}

                                {this.props.showFindBookingButton ? (
                                    <View style={styles.underline}>
                                        <Text style={styles.text} onPress={this.handleNoBookingDetails}>
                                            I don’t have my booking details
                                        </Text>
                                    </View>
                                ) : null}
                            </KeyboardAwareScrollView>
                        </Layout>
                    </>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => ({
    seller: state.auth.seller,
    order: state.order,
});

const mapDispatchToProps = {
    resetEmptySearchResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
