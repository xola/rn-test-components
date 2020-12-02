import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
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
import Icon from 'react-native-vector-icons/AntDesign';

class ExperienceAvailability extends Component {
    state = {
        date: moment(),
    };

    componentDidMount() {
        this.props.selectDate(this.state.date.format('YYYY-MM-DD'));
    }

    handleNextDates = () => {
        const nextDate = this.state.date.clone().add(1, 'days');
        this.setState({ date: nextDate });
    };

    handlePreviousDates = () => {
        const previousDate = this.state.date.clone().subtract(1, 'days');

        if (previousDate.isSameOrAfter(moment(), 'day')) {
            this.setState({ date: previousDate });
        }
    };

    render() {
        const availableDates = [];
        const { selectedDate } = this.props.date;
        const { availability } = this.props.date;
        const currentDate = moment(this.state.date);

        for (let i = 0; i < 5; i++) {
            availableDates.push(currentDate.clone());
            currentDate.add(1, 'days');
        }

        let timeSlots = _.get(availability, selectedDate, {});

        if (_.isArray(timeSlots)) {
            timeSlots = timeSlots.filter(open => open > 0);
        } else {
            timeSlots = _.pickBy(timeSlots, open => open > 0);
        }

        return (
            <Layout header={<Header currentStep={2} title={'Book Activity'} back={'SelectExperience'} />}>
                <View style={styles.container}>
                    <View style={styles.columnDate}>
                        <StyledText styleNames={['h1']} style={styles.label}>
                            Select Date
                        </StyledText>

                        <View style={styles.dates}>
                            {_.map(availableDates, (dateOption, index) => (
                                <View style={styles.date} key={index}>
                                    <DateButton
                                        isFirst={!index}
                                        date={dateOption}
                                        isSelected={selectedDate === dateOption.format('YYYY-MM-DD')}
                                        handleClick={this.props.selectDate}
                                    />
                                </View>
                            ))}
                        </View>

                        <View style={styles.newDates}>
                            <TouchableOpacity style={styles.dateLink} onPress={this.handlePreviousDates}>
                                <Icon style={styles.dateLinkIcon} name="left" />
                                <Text style={styles.dateLinkText}>Previous</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.dateLink} onPress={this.handleNextDates}>
                                <Text style={styles.dateLinkText}>Next</Text>
                                <Icon style={styles.dateLinkIcon} name="right" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.columnTime}>
                        <StyledText styleNames={['h1']} style={styles.label}>
                            Select Time
                        </StyledText>

                        <View style={styles.time}>
                            {this.props.date.isLoading ? (
                                <View style={styles.isLoading}>
                                    <ActivityIndicator />
                                    <StyledText>Loading timeslots</StyledText>
                                </View>
                            ) : _.size(timeSlots) ? (
                                <ScrollView style={styles.timeSlots}>
                                    {_.map(timeSlots, (openSlots, timeSlot) => (
                                        <TimeSlot
                                            key={timeSlot.toString()}
                                            handleClick={this.props.selectTime}
                                            time={timeSlot}
                                            slots={openSlots}
                                        />
                                    ))}
                                </ScrollView>
                            ) : (
                                <StyledText>No available timeslots for that date</StyledText>
                            )}
                        </View>
                    </View>
                </View>
            </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceAvailability);
