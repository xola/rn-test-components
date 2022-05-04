import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import OrderCreateAddOn from './templates/OrderCreateAddOn';
import OrderReviewFinal from './templates/OrderReviewFinal';
import CheckInSuccessPage from './templates/CheckInSuccessPage';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Setup" component={Setup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DiscoverDevices" component={DiscoverDevices} />
            <Stack.Screen name="SelectExperience" component={SelectExperience} />
            <Stack.Screen name="ExperienceAvailability" component={ExperienceAvailability} />
            <Stack.Screen name="OrderCreate" component={OrderCreate} />
            <Stack.Screen name="OrderCreateAddOn" component={OrderCreateAddOn} />
            <Stack.Screen name="OrderReview" component={OrderReview} />
            <Stack.Screen name="OrderReviewFinal" component={OrderReviewFinal} />
            <Stack.Screen name="SearchOrders" component={SearchOrders} />
            <Stack.Screen name="SelectOrder" component={SelectOrder} />
            <Stack.Screen name="CheckInSuccess" component={SuccessPage} />
            <Stack.Screen name="SearchWaivers" component={SearchWaivers} />
            <Stack.Screen name="SelectWaiver" component={SelectWaiver} />
            <Stack.Screen name="SignInWaiver" component={SignInWaiver} />
            <Stack.Screen name="SuccessPage" component={SuccessPage} />
            <Stack.Screen name="CheckInSuccessPage" component={CheckInSuccessPage} />
            <Stack.Screen name="SelectSeller" component={SelectSeller} />
        </Stack.Navigator>
    );
};
