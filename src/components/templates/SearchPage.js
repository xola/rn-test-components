import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { Formik } from 'formik';
import ErrorMessage from '../form/ErrorMessage';
import LoadingButton from '../common/LoadingButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './SearchPageStyle';
import searchSchema from '../../schemas/searchSchema';
import xolaApi from '../../api/xolaApi';
import TextInput from '../common/TextInput';
import FormGroup from '../common/FormGroup';
import { resetEmptySearchResult } from '../../actions/orderActions';
import Icon from 'react-native-vector-icons/AntDesign';
import NavigationService from '../NavigationService';

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
        const { seller } = this.props;
        const logoUrl = xolaApi.xolaUrl(`/api/sellers/${seller.id}/logo?height=512&format=png`);

        return (
            <Formik
                initialValues={{ searchText: '' }}
                onSubmit={this.props.onSearchClick}
                validationSchema={searchSchema}
            >
                {props => (
                    <Layout header={<Header title={this.props.title} back={'Home'} />}>
                        <KeyboardAwareScrollView extraScrollHeight={200} contentContainerStyle={styles.container}>
                            <View>
                                <Image alt={seller.name} style={styles.image} source={{ uri: logoUrl }} />
                            </View>

                            <FormGroup>
                                <TextInput
                                    id="searchText"
                                    onChangeText={props.handleChange('searchText')}
                                    onSubmitEditing={props.handleSubmit}
                                    placeholder="Organizer name, email, phone, or last 4 of your booking ID"
                                />

                                <ErrorMessage name="searchText" />
                            </FormGroup>

                            <LoadingButton
                                isLoading={this.props.order.isLoading}
                                styleNames={['medium']}
                                title="Search"
                                onPress={props.handleSubmit}
                            />

                            {this.props.order.isEmpty ? (
                                <View style={styles.notices}>
                                    <Text style={[styles.notice, styles.alert]}>
                                        <Icon style={styles.alertIcon} name="warning" /> No bookings were found matching
                                        your search
                                    </Text>
                                </View>
                            ) : null}

                            {this.props.showFindBookingButton ? (
                                <Text style={styles.text} onPress={this.handleNoBookingDetails}>
                                    I don’t have my booking details
                                </Text>
                            ) : null}
                        </KeyboardAwareScrollView>
                    </Layout>
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
