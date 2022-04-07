import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
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
                <StyledText style={styles.title}>
                    Select Account
                </StyledText>
                <StyledText style={styles.subtitle}>
                    You have access to multiple Xola accounts. Which account should the Kiosk app log-in to?
                </StyledText>
                <View style={styles.container}>
                    <FlatList
                        data={this.props.sellers}
                        extraData={this.props.sellers}
                        renderItem={({ item }) =>
                            <SellerDelegate key={item.id} seller={item} onClick={this.props.selectSeller} />
                        }
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                </View>
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
