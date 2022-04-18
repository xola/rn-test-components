import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import _ from 'lodash';
import { selectDate, selectTime } from '../../actions/dateActions';
import DateButton from '../common/DateButton';
import TimeSlot from '../common/TimeSlot';
import Header from '../common/Header';
import styles from './ExperienceAvailabilityStyle';
import headerStyles from '../common/HeaderStyle'
import StyledText from '../common/StyledText';
import moment from 'moment';
import { BackIcon, NextIcon } from '../../images/svg';
import variables from '../../styles/variables';
import NavigationService from '../NavigationService';

class ExperienceAvailability extends Component {
    state = {
        date: moment(),
        selectedTime: null
    };

    componentDidMount() {
        this.props.selectDate(this.state.date.format('YYYY-MM-DD'));
    }

    handleNextDates = () => {
        const nextDate = this.state.date.clone().add(1, 'days');
        this.props.selectDate(nextDate.format('YYYY-MM-DD'));
        this.setState({ date: nextDate });
    };

    handlePreviousDates = () => {
        const previousDate = this.state.date.clone().subtract(1, 'days');
        this.props.selectDate(previousDate.format('YYYY-MM-DD'));
        if (previousDate.isSameOrAfter(moment(), 'day')) {
            this.setState({ date: previousDate });
        }
    };

    handleSelectTime = (time) => {
        this.setState({ selectedTime: time })
        this.handleNext(time)
    }

    handleNext = (time) => {
        this.props.selectTime((time))
        NavigationService.navigate('OrderCreate');
    }

    render() {
        const { selectedDate } = this.props.date;
        const { availability } = this.props.date;

        let timeSlots = _.get(availability, selectedDate, {});

        if (_.isArray(timeSlots)) {
            timeSlots = timeSlots.filter(open => open > 0);
        } else {
            timeSlots = _.pickBy(timeSlots, open => open > 0);
            timeSlots = Object.keys(timeSlots).map(item => { return { timeSlot: item, openSlots: timeSlots[item] } })
        }

        return (
            <>
                <Header
                    back={true}
                    right={() => this.state.selectedTime ? <TouchableOpacity onPress={() => this.handleNext()} style={headerStyles.next}>
                        <Text style={headerStyles.nextText}>Next</Text>
                        <NextIcon />
                    </TouchableOpacity> : <View />}
                    steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                    currentStep={2}
                />
                <Layout>
                    <View style={styles.container}>
                        <View style={styles.columnDate}>
                            <TouchableOpacity onPress={this.handlePreviousDates} style={styles.next}>
                                <BackIcon />
                            </TouchableOpacity>
                            <Text style={styles.label}>
                                {moment(this.state.date).format('dddd Do MMM')}
                            </Text>
                            <TouchableOpacity onPress={this.handleNextDates} style={styles.next}>
                                <NextIcon color={variables.textColor} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.columnTime}>
                            {this.props.date.isLoading ? (
                                <View style={styles.isLoading}>
                                    <ActivityIndicator />
                                </View>
                            ) : <FlatList
                                data={timeSlots}
                                extraData={timeSlots}
                                renderItem={({ item }) =>
                                    <TimeSlot
                                        key={item.timeSlot}
                                        handleClick={() => this.handleSelectTime(item.timeSlot)}
                                        selectedTime={this.state.selectedTime}
                                        time={item.timeSlot}
                                        slots={item.openSlots}
                                    />
                                }
                                ListEmptyComponent={
                                    () => <View style={styles.isLoading}>
                                        <StyledText style={styles.noDate}>No available timeslots for that date</StyledText>
                                    </View>
                                }
                                keyExtractor={item => item.timeSlot}
                                numColumns={4}
                            />}

                        </View>
                    </View>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = state => ({
    date: state.date,
});

const mapDispatchToProps = {
    selectDate,
    selectTime,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExperienceAvailability);
