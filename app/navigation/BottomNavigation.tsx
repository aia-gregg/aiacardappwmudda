import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './BottomTabParamList';
import HistoryScreen from '../screens/History/History';
import TopUp from '../screens/Topup/TopupPage';
import HomeScreen from '../screens/Home/Home';
import WalletScreen from '../screens/Wallet/Wallet';
import ProfileScreen from '../screens/Profile/Profile';
import BottomMenu from '../layout/BottomMenu';
import TopUpPage from '../screens/Topup/TopupPage';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown : false
            }}
            tabBar={(props:any) => <BottomMenu {...props}/>}
        >
            <Tab.Screen 
                name='History'
                component={HistoryScreen}
            />
            <Tab.Screen 
                name='Topup'
                component={TopUpPage}
            />
            <Tab.Screen 
                name='Home'
                component={HomeScreen}
            />
            <Tab.Screen 
                name='Wallet'
                component={WalletScreen}
            />
            <Tab.Screen 
                name='Profile'
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation;