import _ from 'lodash';

const DEMOGRAPHICS_MAP = {
    children: ['child', 'children', 'junior'],
    user: ['adults', 'adult', 'guest', 'guests'],
    senior: ['senior', 'seniors'],
    veteran: ['military', 'veteran', 'veterans', 'soldier', 'soldiers'],
};

class OrderUtil {
    static guessDemographicIcon(label) {
        label = label && label.toLowerCase();
        const icon = _.findKey(DEMOGRAPHICS_MAP, function(list) {
            return _.includes(list, label);
        });
        return icon || 'user';
    }

    static getDemographicPrice(experience, demographicId) {
        const priceScheme =
            experience.priceSchemes && experience.priceSchemes[0] && experience.priceSchemes[0]
                ? experience.priceSchemes[0]
                : null;
        if (!priceScheme.price) {
            return;
        }
        let price = priceScheme.price;
        const priceTypeConstraint = priceScheme.constraints.find(
            constraint => constraint.object === 'price_type_constraint',
        );
        const demographic = experience.demographics.find(
            experienceDemographic => experienceDemographic.id === demographicId,
        );
        if (!demographic) {
            return;
        }
        if (demographic.discount) {
            price -= demographic.discount.amount;
        }

        return {
            price: price,
            type: priceTypeConstraint.priceType,
        };
    }

    static getDemographicLabel(experience, demographicId) {
        const demographic = experience.demographics.find(
            experienceDemographic => experienceDemographic.id === demographicId,
        );
        if (demographic) {
            return demographic.label ? demographic.label : 'Guests';
        }
        return 'Guests';
    }
}

export default OrderUtil;
