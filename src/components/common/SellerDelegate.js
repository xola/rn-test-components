import React, { Component } from 'react';
import { View } from 'react-native';
import LoadingButton from './LoadingButton';
import styles from './SellerDelegateStyle';

/**
 * A full-width button that show seller option for multi-seller delegate
 */
class SellerDelegate extends Component {
    onSelectSeller = () => {
        this.props.handleClick(this.props.seller.id);
    };

    render() {
        const { name } = this.props.seller;

        return (
            <View style={styles.container}>
                <LoadingButton title={name} onPress={this.onSelectSeller} styleNames={['large', 'empty']} />
            </View>
        );
    }
}

export default SellerDelegate;
