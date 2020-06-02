import { View, TouchableOpacity, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { Component, Children } from 'react';
import styles from './ClickablePickerStyle';
import StyledText from './StyledText';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * Component that serves as a classic select box for multi-option inputs
 */
class ClickablePicker extends Component {
    static propTypes = {
        title: PropTypes.string,
        textSize: PropTypes.number,
        onValueChange: PropTypes.func,
    };

    state = {
        showPicker: false,
    };

    togglePicker = () => {
        this.setState({ showPicker: !this.state.showPicker });
    };

    handleValueChange = value => {
        this.props.onValueChange(value);
        this.togglePicker();
    };

    getTitle() {
        const { title, value } = this.props;

        if (_.isNil(value)) {
            return title;
        }

        const children = Children.toArray(this.props.children);
        const child = _.find(children, { props: { value } });
        return child ? child.props.label : title;
    }

    render() {
        const { children, value, textSize = 16 } = this.props;
        const { showPicker } = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.togglePicker}>
                    <StyledText style={[styles.label, { fontSize: textSize }]}>
                        <Icon name={showPicker ? 'caretdown' : 'caretright'} size={textSize} /> {this.getTitle()}
                    </StyledText>
                </TouchableOpacity>

                {showPicker ? (
                    <Picker selectedValue={value} onValueChange={this.handleValueChange}>
                        {children}
                    </Picker>
                ) : null}
            </View>
        );
    }
}

export default ClickablePicker;
