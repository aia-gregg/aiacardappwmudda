import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  Image, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import OTPTextInput from 'react-native-otp-textinput';
import Button from '../../components/Button/Button';
import LoginSuccessModal from '../../components/Modal/LoginSuccessModal';
import RegisterSuccessModal from '../../components/Modal/RegisterSuccessModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from '../../../backend/config';

type OTPAuthenticationScreenProps = StackScreenProps<RootStackParamList, 'OTPAuthentication'>;

const OTPAuthentication = ({ navigation, route }: OTPAuthenticationScreenProps) => {
  const { colors } = useTheme() as { colors: any };
  const { user, userToken, setUserToken, setUser } = useContext(AuthContext);

  const {
    email,
    isLogin = false,
    isChangeEmail = false,
    isChangeMobile = false,
    isChangePassword = false,
    areaCode,
    mobile,
  } = route.params;

  useEffect(() => {
    console.log("🔹 isLogin:", isLogin);
    console.log("🔹 isChangeEmail:", isChangeEmail);
    console.log("🔹 isChangeMobile:", isChangeMobile);
    console.log("🔹 isChangePassword:", isChangePassword);
    console.log("🔹 areaCode:", areaCode);
    console.log("🔹 mobile:", mobile);
  }, []);

  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // For resend
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResendOTP = async () => {
    if (resendTimer > 0 || isResending) return;
    try {
      setErrorMessage(null);
      setIsResending(true);

      let endpoint = '';
      let payload: any = {};

      if (isChangeEmail) {
        endpoint = 'resend-change-email-otp';
        payload = { currentEmail: email }; 
      } else if (isChangeMobile) {
        endpoint = 'resend-change-phone-otp';
        payload = { currentAreaCode: areaCode, currentMobile: mobile };
      } else if (isChangePassword) {
        endpoint = 'resend-password-otp';
        payload = {}; // No payload needed; email is extracted from token.
      } else if (isLogin) {
        endpoint = 'resend-login-otp';
        payload = { email };
      } else {
        endpoint = 'resend-register-otp';
        payload = { email };
      }

      console.log(`📩 Resending OTP using endpoint: /${endpoint}`, payload);

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Failed to resend OTP: ${response.status}`);
      }
      const jsonResponse = await response.json();
      console.log("📩 Resend OTP response:", jsonResponse);

      if (jsonResponse.success) {
        setOtpSent(true);
        setResendTimer(30);
      } else {
        setErrorMessage(jsonResponse.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error resending OTP:", error instanceof Error ? error.message : error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // Submit OTP
  const handleSubmitOTP = async () => {
    if (otp.length !== 4) {
      setErrorMessage("Please enter a 4-digit OTP.");
      return;
    }
    try {
      setIsSubmitting(true);
      console.log("🔹 Verifying OTP...");

      let endpoint = '';
      let payload: any = {};

      if (isChangePassword) {
        endpoint = 'verify-change-password-otp';
        payload = { otp };
      } else if (isChangeEmail) {
        endpoint = 'verify-change-email-otp';
        payload = { currentEmail: email, otp };
      } else if (isChangeMobile) {
        endpoint = 'verify-change-phone-otp';
        payload = { currentAreaCode: areaCode, currentMobile: mobile, otp };
      } else if (isLogin) {
        endpoint = 'verify-login-otp';
        payload = { email, otp };
      } else {
        endpoint = 'verify-otp';
        payload = { email, otp };
      }

      console.log(`🔹 OTP verify request to /${endpoint} =>`, payload);

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
        body: JSON.stringify(payload),
      });
      const jsonResponse = await response.json();
      console.log("🔹 OTP Verification Response:", jsonResponse);

      if (jsonResponse.success) {
        console.log("✅ OTP verified successfully.");
        if (jsonResponse.token) {
          await AsyncStorage.setItem('userToken', jsonResponse.token);
          await AsyncStorage.setItem('userData', JSON.stringify(jsonResponse.user));
          setUserToken(jsonResponse.token);
          setUser(jsonResponse.user);
        } else {
          console.warn("⚠️ Warning: No token received from backend.");
        }

        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          if (isChangeEmail || isChangeMobile || isChangePassword) {
            navigation.navigate('Settings');
            return;
          }
          if (jsonResponse.user?.holderId) {
            navigation.navigate('DrawerNavigation', { screen: 'Home' });
          } else {
            if (isLogin) {
              if (jsonResponse.user?.isCardHolder) {
                navigation.navigate('DrawerNavigation', { screen: 'Home' });
              } else {
                navigation.navigate('CardSelect');
              }
            } else {
              navigation.navigate('CardSelect');
            }
          }
        }, 2000);
      } else {
        console.error("❌ OTP verification failed:", jsonResponse.message);
        setErrorMessage(jsonResponse.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error verifying OTP:", error instanceof Error ? error.message : error);
      setErrorMessage("Failed to verify OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, overflow: 'hidden' }}>
      {/* <Image source={IMAGES.pattern2} style={GlobalStyleSheet.colorBg1} />
      <Image source={IMAGES.pattern3} style={GlobalStyleSheet.colorBg2} /> */}
      <Header title="OTP Authentication" leftIcon="back" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 15, paddingVertical: 15, marginBottom: 20 }}>
              <Text style={[GlobalStyleSheet.loginTitle, { color: colors.title }]}>Enter OTP</Text>
              <Text style={[GlobalStyleSheet.loginDesc, { color: colors.text }]}>
                {isChangeMobile
                  ? `A verification code has been sent to ${areaCode}${mobile}.`
                  : isChangePassword
                  ? `A verification code has been sent to ${user?.email}.`
                  : `A verification code has been sent to ${email}.`}
              </Text>
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
              <View style={{ alignItems: 'center' }}>
                <OTPTextInput
                  inputCount={4}
                  tintColor={COLORS.primary}
                  textInputStyle={{
                    borderBottomWidth: 2,
                    color: colors.title,
                  } as any}
                  containerStyle={{
                    width: 300,
                    marginVertical: 50,
                  }}
                  handleTextChange={(text: string) => setOtp(text)}
                />
              </View>
            </View>
            {errorMessage && (
              <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                {errorMessage}
              </Text>
            )}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              {isResending ? (
                <Text style={GlobalStyleSheet.linkBtn}>Resending OTP...</Text>
              ) : resendTimer > 0 ? (
                <Text style={GlobalStyleSheet.linkBtn}>Request again in {resendTimer} seconds</Text>
              ) : (
                <TouchableOpacity style={{ position: 'relative' }} onPress={handleResendOTP}>
                  <Text style={GlobalStyleSheet.linkBtn}>Resend OTP</Text>
                  <View style={GlobalStyleSheet.linkUnderLine} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={GlobalStyleSheet.loginBtnArea}>
            <Button
              title={isSubmitting ? "Verifying..." : "Submit"}
              onPress={!isSubmitting ? handleSubmitOTP : undefined}
              style={{ opacity: isSubmitting ? 0.5 : 1 }}
            />
          </View>
        </View>
      </ScrollView>
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          {isLogin ? <LoginSuccessModal /> : <RegisterSuccessModal />}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OTPAuthentication;