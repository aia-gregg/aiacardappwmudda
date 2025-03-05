import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext'; // Adjust path as needed
import { API_BASE_URL } from '../../../backend/config';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginScreenProps) => {
  const { colors }: { colors: any } = useTheme();
  const { setUserToken, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setErrorMessage('');
    setIsLoading(true);

    const loginData = { email, password };
    console.log("🔹 Attempting login with:", loginData);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const jsonResponse = await response.json();
      console.log("🔹 Login response:", jsonResponse);

      if (jsonResponse.success) {
        console.log("✅ Login successful. Redirecting to OTP Verification...");
        // Always redirect to OTP screen as OTP is mandatory for both flows
        navigation.navigate('OTPAuthentication', { email, isLogin: true });
      } else {
        console.log("❌ Login failed:", jsonResponse.message);
        setErrorMessage(jsonResponse.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      setErrorMessage("Network request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <SafeAreaView style={{ flex: 1, overflow: 'hidden' }}>
        {/* <Image source={IMAGES.pattern2} style={GlobalStyleSheet.colorBg1} />
        <Image source={IMAGES.pattern3} style={GlobalStyleSheet.colorBg2} /> */}
        <Header title="Login" />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 15, paddingVertical: 15, marginBottom: 20 }}>
                <Text style={[GlobalStyleSheet.loginTitle, { color: colors.title, textAlign: "center" }]}>Welcome Back!</Text>
                <Text style={[GlobalStyleSheet.loginDesc, { color: colors.text, textAlign: "center", marginTop: -12 }]}>
                  Login into your AIAPay account
                </Text>
              </View>

              {/* Email Input */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>Email</Text>
                <Input
                  placeholder="Type your email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Input */}
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>Password</Text>
                <Input
                  placeholder="Type your password"
                  value={password}
                  onChangeText={setPassword}
                  type="password"
                />
              </View>

              {/* Error Message */}
              {errorMessage && (
                <Text style={{ color: 'red', marginBottom: 20, textAlign: 'center' }}>
                  {errorMessage}
                </Text>
              )}

              {/* Forgot Password Link */}
              <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={{ position: 'relative' }}
                >
                  <Text style={GlobalStyleSheet.linkBtn}>Forgot Password?</Text>
                  <View style={GlobalStyleSheet.linkUnderLine} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={GlobalStyleSheet.loginBtnArea}>
              <Button
                title={isLoading ? "Logging in..." : "Login"}
                onPress={isLoading ? undefined : handleLogin}
                style={{ opacity: isLoading ? 0.5 : 1 }}
              />

              {/* "Don't have an account? Sign up" */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 15 }}>
                <Text style={{ ...FONTS.font, color: colors.title }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={{ color: 'white', textDecorationLine: 'underline', textDecorationColor: '#EFB900' }}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;