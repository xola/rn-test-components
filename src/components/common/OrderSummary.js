import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { format } from '../../utils/Currency';
import _ from 'lodash';
import styles from './OrderSummaryStyle';
import Currency from './Currency';
import xolaApi from '../../api/xolaApi';
import PropTypes from 'prop-types';
import OrderInfo from './OrderInfo';

/**
 * Component that shows information about order, experience, customer and payment info.
 */
class OrderSummary extends Component {
    static propTypes = {
        experience: PropTypes.object,
        cart: PropTypes.object,
    };

    /**
     * Get breakdown items without add-ons and total.
     */
    getBreakdownItems() {
        const { items } = this.props.cart.preparedOrder;
        const { breakdown } = items[this.props.cart.itemIndex];

        return _.reduce(
            breakdown,
            (items, item) => {
                const [label] = _.keys(item);
                const [value] = _.values(item);

                if (!_.includes(['Add-Ons', 'Total'], label)) {
                    items.push({ label: label.replace(/&nbsp;/g, ' '), value });
                }

                return items;
            },
            [],
        );
    }

    getBreakdownAddOnItems() {
        const { items } = this.props.cart.preparedOrder;
        const item = items[this.props.cart.itemIndex];

        return item.addOns.map(({ configuration, amount, quantity, parent }) => {
            const unit =
                configuration.priceType === 'absolute'
                    ? format(configuration.price, item.currency)
                    : configuration.price + '%';

            const prefix = parent ? `${parent.name}: ` : '';

            return {
                label: `${prefix}${configuration.name} (${unit} × ${quantity})`,
                value: amount,
            };
        });
    }

    render() {
        const { medias, id } = this.props.experience;

        const image = medias[0]
            ? { uri: medias[0].src }
            : { uri: xolaApi.xolaUrl(`api/experiences/${id}/medias/default?size=small`) };

        const { amount, partnerFee } = this.props.cart.preparedOrder;
        let total = amount;
        if (partnerFee && !partnerFee.orderAmountIncludesPartnerFee) {
            total += partnerFee.amount;
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.experience}>
                    <Image style={styles.image} source={image} alt="" />

                    <OrderInfo
                        experience={this.props.experience}
                        item={this.props.cart.order.items[this.props.cart.itemIndex]}
                    />
                </View>

                <View style={styles.breakdown}>
                    {this.getBreakdownItems().map((item, index) => (
                        <View style={styles.line} key={index}>
                            <Text style={styles.label}>{item.label}</Text>
                            <Text style={styles.value}>{item.value}</Text>
                        </View>
                    ))}

                    {this.getBreakdownAddOnItems().map((item, index) => (
                        <View style={styles.line} key={index}>
                            <Text style={styles.label}>{item.label}</Text>

                            <Text style={styles.label}>
                                <Currency>{item.value}</Currency>
                            </Text>
                        </View>
                    ))}

                    <View style={[styles.line, styles.totalContainer]}>
                        <Text style={styles.total}>Total</Text>

                        {total ? (
                            <Text style={styles.total}>
                                <Currency>{total}</Currency>
                            </Text>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default OrderSummary;
