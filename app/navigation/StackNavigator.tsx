import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import { RootStackParamList } from './RootStackParamList';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import OTPAuthentication from '../screens/Auth/OTPAuthentication';
import ResetPassword from '../screens/Auth/ResetPassword';
import Settings from '../screens/Settings/Settings';
import ChangePassword from '../screens/Settings/ChangePassword';
import TwoStepAuthentication from '../screens/Settings/TwoStepAuthentication';
import History from '../screens/History/History';
import Support from '../screens/Support/Support';
import DrawerNavigation from './DrawerNavigation';
import Verification from '../screens/Profile/Verification';
import EditProfile from '../screens/Profile/EditProfile';
import Notifications from '../screens/Notification/Notifications';
import Components from '../screens/Components/Components';
import AccordionScreen from '../screens/Components/Accordion';
import BottomSheet from '../screens/Components/BottomSheet';
import ModalBox from '../screens/Components/ModalBox';
import Buttons from '../screens/Components/Buttons';
import Badges from '../screens/Components/Badges';
import Charts from '../screens/Components/Charts';
import Headers from '../screens/Components/Headers';
import ListScreen from '../screens/Components/lists';
import Pricings from '../screens/Components/Pricings';
import DividerElements from '../screens/Components/DividerElements';
import Snackbars from '../screens/Components/Snackbars';
import CardSelect from '../screens/CardSelect/CardSelect';
import Socials from '../screens/Components/Socials';
import SwipeableScreen from '../screens/Components/Swipeable';
import Tabs from '../screens/Components/Tabs';
import Tables from '../screens/Components/Tables';
import Toggles from '../screens/Components/Toggles';
import Inputs from '../screens/Components/Inputs';
import Footers from '../screens/Components/Footers';
import TabStyle1 from '../components/Footers/FooterStyle1';
import TabStyle2 from '../components/Footers/FooterStyle2';
import TabStyle3 from '../components/Footers/FooterStyle3';
import TabStyle4 from '../components/Footers/FooterStyle4';
import SelectCrypto from '../screens/PaywithCrypto/SelectCrypto';
import PaywithCrypto from '../screens/PaywithCrypto/PaywithCrypto';
import StripePaymentScreen from '../screens/PaywithCard/StripePaymentScreen';
import ActivateCard from '../screens/ActivateCard/ActivateCard';
import ReportLoss from '../screens/ReportLoss/ReportLoss';
import Wallet from '../screens/Wallet/Wallet';
import CardDetails from '../screens/CardDetails/CardDetails';
import ReferralScreen from '../screens/Referral/Referral';
import SelectCard from '../screens/CardSelect/CardSelect';
import TopupPage from '../screens/Topup/TopupPage';
import Topup from '../screens/History/Topup';
import TopupCrypto from '../screens/Topup/TopupCrypto';
import ChangeEmailScreen from '../screens/Settings/ChangeEmailScreen';
import ChangePhoneScreen from '../screens/Settings/ChangePhoneScreen';
import { Platform, StatusBar, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {

    const theme = useTheme();

    return (
        <View style={{width:'100%', flex: 1 }}>
            {Platform.OS === 'web' || Platform.OS === 'android' &&
                <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            }
            <Stack.Navigator
                initialRouteName='OnBoarding'
                screenOptions={{
                    headerShown:false,
                    cardStyle: { backgroundColor: "transparent",flex:1 },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="OTPAuthentication" component={OTPAuthentication} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="TwoStepAuthentication" component={TwoStepAuthentication} />
                <Stack.Screen name="Support" component={Support} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Components" component={Components} />
                <Stack.Screen name="Accordion" component={AccordionScreen} />
                <Stack.Screen name="BottomSheet" component={BottomSheet} />
                <Stack.Screen name="ModalBox" component={ModalBox} />
                <Stack.Screen name="Buttons" component={Buttons} />
                <Stack.Screen name="Badges" component={Badges} />
                <Stack.Screen name="Charts" component={Charts} />
                <Stack.Screen name="Headers" component={Headers} />
                <Stack.Screen name="lists" component={ListScreen} />
                <Stack.Screen name="Pricings" component={Pricings} />
                <Stack.Screen name="DividerElements" component={DividerElements} />
                <Stack.Screen name="Snackbars" component={Snackbars} />
                <Stack.Screen name="CardSelect" component={CardSelect} />
                <Stack.Screen name="Socials" component={Socials} />
                <Stack.Screen name="Swipeable" component={SwipeableScreen} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Tables" component={Tables} />
                <Stack.Screen name="Toggles" component={Toggles} />
                <Stack.Screen name="Inputs" component={Inputs} />
                <Stack.Screen name="Footers" component={Footers} />
                <Stack.Screen name="TabStyle1" component={TabStyle1} />
                <Stack.Screen name="TabStyle2" component={TabStyle2} />
                <Stack.Screen name="TabStyle3" component={TabStyle3} />
                <Stack.Screen name="TabStyle4" component={TabStyle4} />
                <Stack.Screen name="SelectCrypto" component={SelectCrypto} />
                <Stack.Screen name="Wallet" component={Wallet} />
                {/* <Stack.Screen name="TopupPage" component={TopupPage} /> */}
                <Stack.Screen name="CardDetails" component={CardDetails} />
                <Stack.Screen name="ReportLoss" component={ReportLoss} />
                <Stack.Screen name="ActivateCard" component={ActivateCard} />
                <Stack.Screen name="Referral" component={ReferralScreen} />
                <Stack.Screen name="PayWithCrypto" component={PaywithCrypto} />
                <Stack.Screen name="TopupCrypto" component={TopupCrypto} />
                <Stack.Screen name="StripePaymentScreen" component={StripePaymentScreen} />
                <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} />
                <Stack.Screen name="ChangePhoneScreen" component={ChangePhoneScreen} />
                

            </Stack.Navigator>
        </View>
    )
}

export default StackNavigator;