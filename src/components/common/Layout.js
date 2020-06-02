import React, { Component } from 'react';
import { View } from 'react-native';
import Modals from './Modals';
import styles from './LayoutStyle';
import Errors from './Errors';
import PropTypes from 'prop-types';

/**
 * Layout component used on most page templates.
 */
class Layout extends Component {
    static propTypes = {
        header: PropTypes.object,
        modals: PropTypes.object,
        noPadding: PropTypes.bool,
        footer: PropTypes.element,
    };

    render() {
        const { header, footer, children, modals, ...rest } = this.props;
        const styleArray = [styles.main];

        if (this.props.noPadding) {
            styleArray.push(styles.noPadding);
        }

        return (
            <View style={styles.container} {...rest}>
                {header ? <View style={styles.header}>{header}</View> : null}

                <View style={styleArray} role="main">
                    <Errors />
                    <Modals>{modals}</Modals>
                    {children}
                </View>

                {footer ? (
                    <View style={styles.footer}>
                        <View>{footer}</View>
                    </View>
                ) : null}
            </View>
        );
    }
}

export default Layout;
