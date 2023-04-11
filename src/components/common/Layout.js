import React, { Component } from 'react';
import { View } from 'react-native';
import Modals from './Modals';
import styles from './LayoutStyle';
import Errors from './Errors';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            <SafeAreaView style={styles.container}>
                <View style={styles.content} {...rest}>
                    {header ? <View style={styles.header}>{header}</View> : null}

                    <View style={styleArray} role="main">
                        <Errors />
                        <Modals>{modals}</Modals>
                        {children}
                    </View>

                    {footer ? <View style={styles.footer}>{footer}</View> : null}
                </View>
            </SafeAreaView>
        );
    }
}

export default Layout;
