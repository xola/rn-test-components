import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { format } from '../../utils/Currency';
import _ from 'lodash';
import styles from './OrderSummaryStyle';
import StyledText from './StyledText';
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
                <StyledText style={styles.headline}>Booking Summary</StyledText>

                <View style={styles.experience}>
                    <Image style={styles.image} source={image} alt="" />

                    <OrderInfo
                        experience={this.props.experience}
                        item={this.props.cart.order.items[this.props.cart.itemIndex]}
                    />
                </View>

                <StyledText style={styles.headline}>Payment Summary</StyledText>

                <View style={styles.breakdown}>
                    {this.getBreakdownItems().map((item, index) => (
                        <View style={styles.line} key={index}>
                            <StyledText>{item.label}</StyledText>
                            <StyledText>{item.value}</StyledText>
                        </View>
                    ))}

                    {this.getBreakdownAddOnItems().map((item, index) => (
                        <View style={styles.line} key={index}>
                            <StyledText>{item.label}</StyledText>

                            <StyledText>
                                <Currency>{item.value}</Currency>
                            </StyledText>
                        </View>
                    ))}

                    <View style={styles.line}>
                        <StyledText style={styles.total}>Total</StyledText>

                        {total ? (
                            <StyledText style={styles.total}>
                                <Currency>{total}</Currency>
                            </StyledText>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default OrderSummary;
