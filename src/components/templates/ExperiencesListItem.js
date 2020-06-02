import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './ExperienceListStyle';
import StyledText from '../common/StyledText';
import Currency from '../common/Currency';
import xolaApi from '../../api/xolaApi';

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
        let price = priceSchemes[0] && priceSchemes[0].price ? priceSchemes[0].price : null;

        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.button} onPress={this.handleExperienceSelect}>
                    <Image source={image} style={styles.image} />

                    <View style={styles.description}>
                        <StyledText styleNames={['h2', 'uppercase']} style={styles.name}>
                            {experience.name.trim()}
                        </StyledText>

                        <StyledText style={styles.price}>
                            <Currency>{price}</Currency>
                        </StyledText>

                        <StyledText style={styles.description}>{experience.excerpt}</StyledText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ExperiencesListItem;
