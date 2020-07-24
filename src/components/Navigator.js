import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './templates/Home';
import SelectExperience from './templates/SelectExperience';
import ExperienceAvailability from './templates/ExperienceAvailability';
import OrderCreate from './templates/OrderCreate';
import OrderReview from './templates/OrderReview';
import SearchOrders from './templates/SearchOrders';
import SelectOrder from './templates/SelectOrder';
import SelectWaiver from './templates/SelectWaiver';
import SignInWaiver from './templates/SignInWaiver';
import DiscoverDevices from './templates/DiscoverDevices';
import LogIn from './templates/LogIn';
import SearchWaivers from './templates/SearchWaivers';
import SuccessPage from './templates/SuccessPage';
import Setup from './templates/Setup';
import SelectSeller from './templates/SelectSeller';

const Navigator = createStackNavigator(
    {
        LogIn: { screen: LogIn },
        Setup: { screen: Setup, navigationOptions: { gesturesEnabled: false } },
        Home: { screen: Home, navigationOptions: { gesturesEnabled: false } },
        DiscoverDevices: { screen: DiscoverDevices },
        SelectExperience: { screen: SelectExperience },
        ExperienceAvailability: { screen: ExperienceAvailability },
        OrderCreate: { screen: OrderCreate },
        OrderReview: { screen: OrderReview },
        SearchOrders: { screen: SearchOrders },
        SelectOrder: { screen: SelectOrder },
        CheckInSuccess: { screen: SuccessPage },
        SearchWaivers: { screen: SearchWaivers },
        SelectWaiver: { screen: SelectWaiver },
        SignInWaiver: { screen: SignInWaiver },
        SuccessPage: { screen: SuccessPage },
        SelectSeller: { screen: SelectSeller },
    },
    {
        headerMode: 'none',
    },
);

export default Navigator;
