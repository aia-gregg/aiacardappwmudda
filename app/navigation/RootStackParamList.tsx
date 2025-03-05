import { NavigatorScreenParams } from "@react-navigation/native";
import { BottomTabParamList } from "./BottomTabParamList";

// Define the types if they're not imported from another module:
export type CardOption = {
  title: string;
  price: string;
  dailyLimit: string;
  monthlyLimit: string;
  topupFees: string;
  transactionFees: string;
  fxFees: string;
  applePay: boolean;
  googlePay: boolean;
  kycRequirement: string;
  image: any;
};

export type CryptoOption = {
  name: string;
  network: string;
  display: string;
  icon: any;
};

export type RootStackParamList = {
  DrawerNavigation: NavigatorScreenParams<BottomTabParamList>;
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OTPAuthentication: {
    email?: string;
    isLogin?: boolean;
    isChangeEmail?: boolean;
    isChangeMobile?: boolean;
    isChangePassword?: boolean;
    areaCode?: string;  // <--- ADD THIS
    mobile?: string;    // <--- ADD THIS
  };
  ResetPassword: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  TwoStepAuthentication: undefined;
  Support: undefined;
  History: undefined;
  Verification: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  Components: undefined;
  Accordion: undefined;
  BottomSheet: undefined;
  ModalBox: undefined;
  Buttons: undefined;
  Badges: undefined;
  Charts: undefined;
  Headers: undefined;
  lists: undefined;
  Pricings: undefined;
  DividerElements: undefined;
  Snackbars: undefined;
  Socials: undefined;
  Swipeable: undefined;
  Tabs: undefined;
  Tables: undefined;
  Toggles: undefined;
  Inputs: undefined;
  Footers: undefined;
  TabStyle1: undefined;
  TabStyle2: undefined;
  TabStyle3: undefined;
  TabStyle4: undefined;
  CardSelect: undefined;
  Referral: undefined;
  TopupPage: undefined;
  CardDetails: undefined;
  ReportLoss: undefined;
  SelectCard: undefined;
  ActivateCard: undefined;
  Wallet: undefined;
  TopupCrypto: { card: { name: string; balance: string }; topupAmount: string; chosenCrypto: { name: string; network: string; display: string; icon: any } };
  SelectCrypto: { chosenCard: CardOption };
  PayWithCrypto: { chosenCard: CardOption; chosenCrypto: CryptoOption };
  StripePaymentScreen: { chosenCard: CardOption } | undefined;
  ChangeEmailScreen: undefined;
  ChangePhoneScreen: undefined;
};