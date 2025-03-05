import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from '../../../backend/config';

const ChangePassword = ({ navigation }: any) => {
  const { colors } : { colors: any } = useTheme();
  const { userToken } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword) {
      setErrorMessage('Please fill all fields and ensure new passwords match.');
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/change-password-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const jsonRes = await response.json();
      if (!jsonRes.success) {
        throw new Error(jsonRes.message);
      }
      // OTP sent successfully – navigate to OTPAuthentication screen.
      navigation.navigate('OTPAuthentication', { isChangePassword: true });
    } catch (error: any) {
      // Instead of an alert, show the error message below current password.
      setErrorMessage(error.message || 'Failed to update password.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <Header title="Change Password" leftIcon="back" />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingTop: 5, paddingBottom: 150 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={[
                    GlobalStyleSheet.label,
                    { color: colors.title, marginTop: 15, marginBottom: 10 },
                  ]}
                >
                  Current Password
                </Text>
                <Input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                {errorMessage ? (
                  <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text>
                ) : null}
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={[
                    GlobalStyleSheet.label,
                    { color: colors.title, marginBottom: 10 },
                  ]}
                >
                  New Password
                </Text>
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text
                  style={[
                    GlobalStyleSheet.label,
                    { color: colors.title, marginBottom: 10 },
                  ]}
                >
                  Confirm Password
                </Text>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>
          </ScrollView>
          {/* Pinned Update Button */}
          <View style={{ paddingVertical: 15, pointerEvents: isUpdating ? 'none' : 'auto' }}>
            <Button
              onPress={!isUpdating ? handleSubmit : undefined}
              title={isUpdating ? 'Updating...' : 'Update'}
              style={{ opacity: isUpdating ? 0.5 : 1 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;