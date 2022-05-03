import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import _ from 'lodash';
import { selectDate, selectTime } from '../../actions/dateActions';
import DateButton from '../common/DateButton';
import TimeSlot from '../common/TimeSlot';
import Header from '../common/Header';
import styles from './ExperienceAvailabilityStyle';
import StyledText from '../common/StyledText';
import moment from 'moment';
import { BackIcon, NextIcon } from '../../images/svg';
import variables from '../../styles/variables';
import NavigationService from '../NavigationService';
import DateSlot from '../common/DateSlot';
import { w } from '../../utils/Scale';

const NUM_COLUMNS = 4
class ExperienceAvailability extends Component {
    state = {
        date: moment(),
        dateSlotMore: true,
        dateSlotLength: 3
    };

    componentDidMount() {
        this.props.selectDate(this.state.date.format('YYYY-MM-DD'));

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.selectDate(this.state.date.format('YYYY-MM-DD'));
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
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

    handleMoreDates = () => {
        this.setState({ dateSlotLength: 15, dateSlotMore: false })
    }

    handleNext = (time) => {
        this.props.selectTime(time)
        NavigationService.navigate('OrderCreate');
    }

    handleDateNext = (date) => {
        this.props.selectDate(date)
        NavigationService.navigate('OrderCreate');
    }

    render() {
        const { selectedDate } = this.props.date;
        const { availability } = this.props.date;

        let timeSlots = _.get(availability, selectedDate, {});

        const dateSlot = !Object.values(availability).map(item => _.isArray(item)).some(item => item === false)

        if (_.isArray(timeSlots)) {
            timeSlots = timeSlots.filter(open => open > 0);
        } else {
            timeSlots = _.pickBy(timeSlots, open => open > 0);
            timeSlots = Object.keys(timeSlots).map(item => { return { timeSlot: item, openSlots: timeSlots[item] } })
        }
        if (timeSlots.length % NUM_COLUMNS !== 0) {
            const emptySlots = Array(NUM_COLUMNS - timeSlots.length % NUM_COLUMNS).fill().map(() => {
                return {
                    isEmpty: true
                }
            })
            timeSlots.push(...emptySlots)
        }

        let disableNextDate = false
        if (this.state.date.format('YYYY-MM-DD') > moment().clone().add(30, 'days').format('YYYY-MM-DD')) {
            disableNextDate = true
        }


        let disablePrevDate = false
        if (this.state.date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            disablePrevDate = true
        }

        const today = moment().format('YYYY-MM-DD')
        const tomorrow = moment().clone().add(1, 'days').format('YYYY-MM-DD')

        const dateSlots = [...Array(this.state.dateSlotLength)].map((item, index) => {
            const date = moment().clone().add(Number(index + 2), 'days').format('YYYY-MM-DD')
            return {
                date: date,
                openSlots: availability[date]
            }
        })

        return (
            <>
                <Header
                    back={true}
                    steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                    currentStep={2}
                />
                <Layout>
                    <View style={styles.container}>
                        {dateSlot ? this.props.date.isLoading ? (
                            <View style={styles.isLoading}>
                                <ActivityIndicator />
                            </View>
                        ) :
                            <ScrollView>
                                <View style={[styles.columnDate, { height: w(100) }]}>
                                    <DateSlot
                                        handleClick={() => this.handleDateNext(today)}
                                        date={'Today'}
                                        slots={availability[today]}
                                        disabled={!availability[today] || availability[today]?.reduce((total, item) => total + item, 0) === 0}
                                    />
                                    <DateSlot
                                        handleClick={() => this.handleDateNext(tomorrow)}
                                        date={'Tomorrow'}
                                        slots={availability[tomorrow]}
                                        disabled={!availability[tomorrow] || availability[tomorrow]?.reduce((total, item) => total + item, 0) === 0}
                                    />
                                </View>
                                <View style={styles.datesContainer}>
                                    <FlatList
                                        data={dateSlots}
                                        extraData={dateSlots}
                                        renderItem={({ item }) =>
                                            <DateSlot
                                                key={item.date}
                                                handleClick={() => this.handleDateNext(item.date)}
                                                date={moment(item.date).format('ddd DD MMM')}
                                                slots={item.openSlots}
                                                disabled={!item.openSlots || item.openSlots?.reduce((total, item) => total + item, 0) === 0}
                                            />
                                        }
                                        ListEmptyComponent={
                                            () => <View style={styles.isLoading}>
                                                <StyledText style={styles.noDate}>No available timeslots for that date</StyledText>
                                            </View>
                                        }
                                        keyExtractor={item => item.timeSlot}
                                        numColumns={3}
                                        ListFooterComponent={() =>
                                            this.state.dateSlotMore ? <TouchableOpacity onPress={this.handleMoreDates} style={[styles.next, {
                                                borderRadius: variables.borderRadius,
                                                width: '98%',
                                                alignSelf: 'center',
                                            }]}>
                                                <Text style={styles.dateText}>More Dates</Text>
                                            </TouchableOpacity> : <View></View>
                                        }
                                    />
                                </View>
                            </ScrollView>
                            :
                            <View><View style={styles.columnDate}>
                                <TouchableOpacity disabled={disablePrevDate} onPress={this.handlePreviousDates} style={[styles.next, {
                                    backgroundColor: disablePrevDate ? variables.lightGrey : variables.white
                                }]}>
                                    <BackIcon />
                                </TouchableOpacity>
                                <Text style={styles.label}>
                                    {moment(this.state.date).format('dddd Do MMM')}
                                </Text>
                                <TouchableOpacity disabled={disableNextDate} onPress={this.handleNextDates} style={[styles.next, {
                                    backgroundColor: disableNextDate ? variables.lightGrey : variables.white
                                }]}>
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
                                                handleClick={() => this.handleNext(item.timeSlot)}
                                                time={item.timeSlot}
                                                slots={item.openSlots}
                                                isEmpty={item.isEmpty}
                                            />
                                        }
                                        ListEmptyComponent={
                                            () => <View style={styles.isLoading}>
                                                <StyledText style={styles.noDate}>No available timeslots for that date</StyledText>
                                            </View>
                                        }
                                        keyExtractor={item => item.timeSlot}
                                        numColumns={NUM_COLUMNS}
                                    />}
                                </View>
                            </View>}
                    </View>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = state => ({
    date: state.date,
    experience: state.experiences.collection[state.cart.order.items[state.cart.itemIndex].experience.id],
});

const mapDispatchToProps = {
    selectDate,
    selectTime,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExperienceAvailability);
