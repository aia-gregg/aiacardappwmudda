import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet,
  Modal
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { IMAGES } from '../../constants/Images';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../context/AuthContext';
import SuccessEditProfileModal from '../../components/Modal/SuccessEditProfile';
import FailEditProfileModal from '../../components/Modal/FailEditProfile';

const EditProfile = () => {
  const { colors } : { colors: any } = useTheme();
  const { user, updateUserProfile, refreshUser } = useContext(AuthContext);

  // Initialize state once on mount using the user data
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [birthday, setBirthday] = useState(user?.birthday || '');
  const [address, setAddress] = useState(user?.address || '');
  const [town, setTown] = useState(user?.town || '');
  const [postCode, setPostCode] = useState(user?.postCode || '');
  const [country, setCountry] = useState(user?.country || '');
  const [referralId, setReferralId] = useState(user?.referralId || '');

  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  // Run once on mount to initialize state from user
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setBirthday(user.birthday || '');
      setAddress(user.address || '');
      setTown(user.town || '');
      setPostCode(user.postCode || '');
      setCountry(user.country || '');
      setReferralId(user.referralId || '');
    }
  }, []); // runs only once

  // Auto-format birthday input as yyyy-mm-dd
  const formatBirthday = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 4 && digits.length <= 6) {
      formatted = digits.slice(0, 4) + '-' + digits.slice(4);
    } else if (digits.length > 6) {
      formatted = digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6, 8);
    }
    return formatted;
  };

  const handleBirthdayChange = (text: string) => {
    const formatted = formatBirthday(text);
    setBirthday(formatted);
  };

  // Handle Save: update profile without alerts
  const handleSave = async () => {
    const updatedProfile = {
      firstName,
      lastName,
      email,
      birthday,
      address,
      town,
      postCode,
      country,
      photo: IMAGES.profilePic, // Always use default photo
    };

    try {
      await updateUserProfile(updatedProfile);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
      await refreshUser();
    } catch (error) {
      setShowFailModal(true);
      setTimeout(() => {
        setShowFailModal(false);
      }, 2000);
      console.error('Profile update error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header leftIcon="back" title="Edit Profile" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
          >
            <View style={styles.container}>
              {/* First Name and Last Name */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>First Name</Text>
                <Input value={firstName} onChangeText={setFirstName} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>Last Name</Text>
                <Input value={lastName} onChangeText={setLastName} />
              </View>
              {/* Birthday */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>Birthday</Text>
                <Input
                  value={birthday}
                  onChangeText={handleBirthdayChange}
                  keyboardType="numeric"
                />
              </View>
              {/* Address Details */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>Address</Text>
                <Input value={address} onChangeText={setAddress} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>City</Text>
                <Input value={town} onChangeText={setTown} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>Postal Code</Text>
                <Input value={postCode} onChangeText={setPostCode} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>Country</Text>
                <Input value={country} onChangeText={setCountry} />
              </View>
              {/* Referral ID (Uneditable) */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.title }]}>Referral ID</Text>
                <Input value={referralId} editable={false} />
              </View>
            </View>
          </ScrollView>
          <View style={[styles.saveButtonContainer, { backgroundColor: colors.background }]}>
            <TouchableOpacity
              style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
              onPress={handleSave}
            >
              <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <SuccessEditProfileModal />
        </View>
      </Modal>
      <Modal transparent visible={showFailModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <FailEditProfileModal />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  saveButtonContainer: {
    padding: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfile;