import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { selectSeller } from '../../actions/authActions';
import styles from './SelectSellerStyle';
import Layout from '../common/Layout';
import _ from 'lodash';
import SellerDelegate from '../common/SellerDelegate';
import StyledText from '../common/StyledText';

class SelectSeller extends Component {
    render() {
        return (
            <Layout>
                <StyledText styleNames={['h1']} style={styles.title}>
                    Select Account
                </StyledText>
                <StyledText styleNames={['h3']} style={styles.subTitle}>
                    You have access to multiple Xola accounts. Which account should the Kiosk app log-in to?
                </StyledText>
                <ScrollView style={styles.container}>
                    {_.map(this.props.sellers, seller => (
                        <SellerDelegate key={seller.id} seller={seller} onClick={this.props.selectSeller} />
                    ))}
                </ScrollView>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    sellers: state.auth.sellers,
});

const mapDispatchToProps = {
    selectSeller,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectSeller);
