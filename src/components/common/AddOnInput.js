import React, { Component } from 'react';
import _ from 'lodash';
import Spinner from './Spinner';
import { View, Switch, Picker } from 'react-native';
import ClickablePicker from './ClickablePicker';
import styles from './AddOnInputStyle';
import PropTypes from 'prop-types';

/**
 * Input component that determines type of input to be shown based on addOn type
 */
class AddOnInput extends Component {
    static propTypes = {
        addOn: PropTypes.object,
        onAddonChange: PropTypes.func,
    };

    state = {
        selectedChoice: null,
        isChecked: null,
    };

    handleBooleanChange = isChecked => {
        if (isChecked) {
            this.setState({ isChecked: true });
            this.props.onAddonChange(this.props.addOn, 1);
        } else {
            this.setState({ isChecked: false });
            this.props.onAddonChange(this.props.addOn, 0);
        }
    };

    handleQuantityChange = (id, quantity) => {
        this.props.onAddonChange(this.props.addOn, quantity);
    };

    handleDropDownChange = value => {
        this.props.addOn.choices.forEach(choice => {
            const preparedChoice = { configuration: choice, quantity: 0 };

            if (value === choice.id) {
                this.props.onAddonChange(preparedChoice, 1, this.props.addOn);
            } else {
                this.props.onAddonChange(preparedChoice, 0, this.props.addOn);
            }
        });

        this.setState({ selectedChoice: value });
    };

    render() {
        const { addOn } = this.props;

        if (addOn.object === 'quantity') {
            return (
                <Spinner
                    key={addOn.configuration.id}
                    label={addOn.label}
                    description={addOn.desc}
                    value={addOn.quantity}
                    onChange={this.handleQuantityChange}
                    id={addOn.configuration.id}
                    name="Add On"
                    min={0}
                />
            );
        }

        if (addOn.object === 'boolean') {
            return (
                <View style={styles.container}>
                    <View style={styles.action}>
                        <Switch
                            id={addOn.configuration.id}
                            name={addOn.configuration.id}
                            onValueChange={this.handleBooleanChange}
                            value={this.state.isChecked}
                        />
                    </View>
                </View>
            );
        }

        if (addOn.object === 'choices') {
            return (
                <View style={styles.container}>
                    <View style={styles.action}>
                        <ClickablePicker
                            value={this.state.selectedChoice}
                            onValueChange={this.handleDropDownChange}
                            title="Choose an option"
                            textSize={16}
                        >
                            <Picker.Item label="None" value={null} />

                            {addOn.choices.map(choice => (
                                <Picker.Item label={choice.name} key={choice.id} value={choice.id} />
                            ))}
                        </ClickablePicker>
                    </View>
                </View>
            );
        }

        return null;
    }
}

export default AddOnInput;
