import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class StyledComponent extends Component {
    static propTypes = {
        styleNames: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        styleNames: [],
    };

    getStyles() {
        const { styleNames, style } = this.props;
        const { styles, basicStyle } = this.state;
        const styleArray = [styles[basicStyle]];

        styleNames.forEach(function(styleName) {
            if (_.isString(styleName) && styles[styleName]) {
                styleArray.push(styles[styleName]);
            }
        });

        if (style) {
            styleArray.push(style);
        }
        return styleArray;
    }
}

export default StyledComponent;
