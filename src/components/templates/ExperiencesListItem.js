import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './ExperienceListStyle';
import StyledText from '../common/StyledText';
import Currency from '../common/Currency';
import xolaApi from '../../api/xolaApi';
import { PriceIcon } from '../../images/svg';

class ExperiencesListItem extends Component {
    handleExperienceSelect = () => {
        this.props.onClick(this.props.experience);
    };

    render() {
        const { experience } = this.props;

        const image = experience.medias[0]
            ? { uri: experience.medias[0].src }
            : { uri: xolaApi.xolaUrl(`api/experiences/${experience.id}/medias/default?size=medium`) };

        const priceSchemes = experience.priceSchemes;
        const price = priceSchemes[0] && priceSchemes[0].price ? priceSchemes[0].price : null;
        const priceType = priceSchemes[0] && priceSchemes[0].constraints[0]?.priceType ? priceSchemes[0].constraints[0].priceType : '';

        return (
            <TouchableOpacity style={styles.button} onPress={this.handleExperienceSelect}>
                <Image source={image} style={styles.image} />

                <View>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.name}>
                                {experience.name.trim()}
                            </Text>
                        </View>

                        <View style={styles.priceContainer}>
                            <PriceIcon />
                            <Text style={styles.price}>
                                <Currency>{price}</Currency>/{priceType}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.description}>{experience.excerpt}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ExperiencesListItem;
