import React, { Component } from 'react';
import _ from 'lodash';
import Spinner from './Spinner';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import ClickablePicker from './ClickablePicker';
import styles from './AddOnInputStyle';
import PropTypes from 'prop-types';
import Currency from './Currency';
import { CheckIcon } from '../../images/svg';
import { format } from '../../utils/Currency';

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
                <View style={styles.container}>
                    <View style={[styles.action, { borderWidth: 0 }]}>
                        <Spinner
                            key={addOn.configuration.id}
                            description={addOn.desc}
                            value={addOn.quantity}
                            onChange={this.handleQuantityChange}
                            id={addOn.configuration.id}
                            name="Add On"
                            min={0}
                            addOnValue={() => <View style={styles.quantityContainer}>
                                <Text style={styles.quantity}>
                                    {addOn.quantity}
                                </Text>
                                <Text style={[styles.description, { marginLeft: 0 }]}>
                                    <Currency>{addOn.configuration.price}</Currency> / add-on
                                </Text>
                            </View>}
                        />
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.label}>{addOn.label}</Text>
                        <Text style={styles.description}>{addOn.description}</Text>
                    </View>
                </View>

            );
        }

        if (addOn.object === 'boolean') {
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.handleBooleanChange(!this.state.isChecked)} style={styles.action}>
                        <View style={styles.flex}>
                            <View style={styles.content}>
                                <View style={styles.checkBox}>
                                    {this.state.isChecked && <CheckIcon />}
                                </View>
                                <Text style={styles.description}><Currency>{addOn.configuration.price}</Currency></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.detail}>
                        <Text style={styles.label}>{addOn.label}</Text>
                        <Text style={styles.description}>{addOn.description}</Text>
                    </View>
                </View>
            );
        }

        if (addOn.object === 'choices') {
            const { currency = 'USD', children: amount = 0 } = this.props
            return (
                <View style={styles.container}>
                    <View style={styles.action}>
                        <View style={styles.content}>
                            <ClickablePicker
                                value={this.state.selectedChoice}
                                onValueChange={this.handleDropDownChange}
                                title={() => <Text style={styles.description}>Choose an option</Text>}
                            >
                                <Picker.Item style={{ backgroundColor: 'red' }} label={'None'} value={null} />

                                {addOn.choices.map(choice => (
                                    <Picker.Item label={`${choice.name} - ${format(choice.price, currency)}`} key={choice.id} value={choice.id} />
                                ))}
                            </ClickablePicker>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.label}>{addOn.label}</Text>
                        <Text style={styles.description}>{addOn.description}</Text>
                    </View>
                </View>
            );
        }

        return null;
    }
}

export default AddOnInput;
