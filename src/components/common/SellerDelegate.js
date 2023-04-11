import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import xolaApi from '../../api/xolaApi';
import styles from './SellerDelegateStyle';

/**
 * A full-width button that show seller option for multi-seller delegate
 */
class SellerDelegate extends Component {
    handleSelectSeller = () => {
        this.props.onClick(this.props.seller.id);
    };

    render() {
        const { name, id } = this.props.seller;
        const sellerImg = xolaApi.xolaUrl(`/api/sellers/${id}/logo?height=512&format=png`);

        return (
            <TouchableOpacity style={styles.container} onPress={this.handleSelectSeller} >
                <Image source={{ uri: sellerImg }} style={styles.image} />
                <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

export default SellerDelegate;
