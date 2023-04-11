import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './ModalsStyle';

class Modals extends Component {
    render() {
        const { children } = this.props;

        return <View style={styles.container}>{children}</View>;
    }
}

export default Modals;
