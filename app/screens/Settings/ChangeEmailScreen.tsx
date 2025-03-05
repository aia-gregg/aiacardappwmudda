import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { API_BASE_URL } from '../../../backend/config';

const ChangeEmailScreen = ({ navigation }: any) => {
  const { colors } : { colors: any } = useTheme();

  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Force first letter to lowercase
  const handleEmailChange = (text: string, setter: (val: string) => void) => {
    const modifiedText = text ? text.charAt(0).toLowerCase() + text.slice(1) : '';
    setter(modifiedText);
  };

  const handleSubmit = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    if (!currentEmail || !newEmail || !confirmEmail || newEmail !== confirmEmail) {
      Alert.alert('Error', 'Please ensure all email fields are filled & match.');
      setIsUpdating(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/change-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEmail, newEmail }),
      });
      const jsonRes = await response.json();
      if (jsonRes.success) {
        navigation.navigate('OTPAuthentication', {
          isChangeEmail: true,
          email: currentEmail,
        });
      } else {
        Alert.alert('Error', jsonRes.message || 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('handleSubmit error:', error);
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
        <Header title="Change Email Address" leftIcon="back" />
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 5,
              paddingBottom: 150,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginTop:15, marginBottom:10 }]}>
                  Current Email Address
                </Text>
                <Input
                  type="text"
                  placeholder="Current email"
                  value={currentEmail}
                  onChangeText={(text: string) => handleEmailChange(text, setCurrentEmail)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom:10 }]}>
                  New Email Address
                </Text>
                <Input
                  type="text"
                  placeholder="New email"
                  value={newEmail}
                  onChangeText={(text: string) => handleEmailChange(text, setNewEmail)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label, { color: colors.title, marginBottom:10 }]}>
                  Confirm Email Address
                </Text>
                <Input
                  type="text"
                  placeholder="Confirm email"
                  value={confirmEmail}
                  onChangeText={(text: string) => handleEmailChange(text, setConfirmEmail)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>
          </ScrollView>
          {/* Pinned Update Button – unclickable and greyed out when updating */}
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

export default ChangeEmailScreen;