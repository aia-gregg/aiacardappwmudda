import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

const ActivateCard = ({ navigation }: { navigation: any }) => {
  const { colors }: { colors: any } = useTheme();

  // States for input fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // States for live validation
  const [isCardNumberValid, setIsCardNumberValid] = useState<boolean>(false);
  const [isExpiryValid, setIsExpiryValid] = useState<boolean>(false);
  const [isCvvValid, setIsCvvValid] = useState<boolean>(false);

  // Error message states (shown on continue press if invalid)
  const [cardNumberError, setCardNumberError] = useState<string>('');
  const [expiryError, setExpiryError] = useState<string>('');
  const [cvvError, setCvvError] = useState<string>('');

  // Activation process state
  const [activating, setActivating] = useState<boolean>(false);

  // Modal visibility states
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [failureModalVisible, setFailureModalVisible] = useState<boolean>(false);

  // Static "database" of valid card details with different card numbers starting with 4242
  const validCards = [
    { cardNumber: '4242424242424242', expiry: '12-25', cvv: '123' },
    { cardNumber: '4242424242424243', expiry: '11-23', cvv: '456' },
    { cardNumber: '4242424242424244', expiry: '10-24', cvv: '789' },
    { cardNumber: '4242424242424245', expiry: '09-26', cvv: '321' },
    { cardNumber: '4242424242424246', expiry: '08-23', cvv: '654' },
    { cardNumber: '4242424242424247', expiry: '07-25', cvv: '987' },
    { cardNumber: '4242424242424248', expiry: '06-24', cvv: '159' },
    { cardNumber: '4242424242424249', expiry: '05-23', cvv: '753' },
    { cardNumber: '4242424242424250', expiry: '04-25', cvv: '852' },
    { cardNumber: '4242424242424251', expiry: '03-26', cvv: '456' },
  ];

  // Helper to format card number (insert dashes every 4 digits) and update live validation
  const handleCardNumberChange = (input: string) => {
    const digits = input.replace(/\D/g, '');
    const limited = digits.substring(0, 16);
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1-');
    setCardNumber(formatted);

    if (limited.length === 16) {
      setIsCardNumberValid(limited.startsWith("4242"));
    } else {
      setIsCardNumberValid(false);
    }
  };

  // Helper to format expiry date (MM-YY) and update live validation
  const handleExpiryDateChange = (input: string) => {
    const digits = input.replace(/\D/g, '');
    const limited = digits.substring(0, 4);
    let formatted = limited;
    if (limited.length > 2) {
      formatted = limited.substring(0, 2) + '-' + limited.substring(2);
    }
    setExpiryDate(formatted);

    if (formatted.length === 5) {
      const [mm, yy] = formatted.split('-');
      const month = parseInt(mm, 10);
      const year = parseInt(yy, 10);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const fullYear = 2000 + year;
      setIsExpiryValid(fullYear > currentYear || (fullYear === currentYear && month >= currentMonth));
    } else {
      setIsExpiryValid(false);
    }
  };

  // Helper to limit CVV input to 3 digits and update live validation
  const handleCvvChange = (input: string) => {
    const digits = input.replace(/\D/g, '');
    const limited = digits.substring(0, 3);
    setCvv(limited);
    setIsCvvValid(limited.length === 3);
  };

  // When user presses Continue
  const handleContinue = () => {
    setCardNumberError('');
    setExpiryError('');
    setCvvError('');

    const plainCardNumber = cardNumber.replace(/-/g, '');
    let valid = true;
    if (plainCardNumber.length !== 16 || !plainCardNumber.startsWith('4242')) {
      setCardNumberError('Invalid card number');
      valid = false;
    }
    if (expiryDate.length !== 5 || !isExpiryValid) {
      setExpiryError('Invalid expiry date');
      valid = false;
    }
    if (cvv.length !== 3 || !isCvvValid) {
      setCvvError('Invalid CVV');
      valid = false;
    }
    if (!valid) return;

    setActivating(true);

    // Simulate an asynchronous database check
    setTimeout(() => {
      setActivating(false);
      const match = validCards.find(
        card =>
          card.cardNumber === plainCardNumber &&
          card.expiry === expiryDate &&
          card.cvv === cvv
      );
      if (match) {
        setSuccessModalVisible(true);
      } else {
        setFailureModalVisible(true);
      }
    }, 2000);
  };

  // Success Modal Component
const SuccessModal = () => (
  <Modal transparent animationType="fade">
    <View style={styles.modalBackdrop}>
      <View style={styles.modalContainer}>
        <Text style={[FONTS.h4, { color: '#fff', textAlign: 'center', marginBottom: 10 }]}>
          Card Activated Successfully!
        </Text>
        <Text style={[FONTS.font, { color: '#ccc', textAlign: 'center', marginBottom: 15 }]}>
          Link the card to your Apple or Google Pay and start spending crypto like cash globally.
        </Text>
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: COLORS.primary, marginBottom: 10 }]}
          onPress={() => setSuccessModalVisible(false)}
        >
          <Text style={[FONTS.fontBaseSemiBold, { color: '#000', textAlign: 'center' }]}>
            Link to Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
          onPress={() => setSuccessModalVisible(false)}
        >
          <Text style={[FONTS.fontBaseSemiBold, { color: '#000', textAlign: 'center' }]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// Failure Modal Component
const FailureModal = () => (
  <Modal transparent animationType="fade">
    <View style={styles.modalBackdrop}>
      <View style={styles.modalContainer}>
        <Text style={[FONTS.h4, { color: '#fff', textAlign: 'center', marginBottom: 15 }]}>
          Card is Invalid!
        </Text>
        <Text style={[FONTS.font, { color: '#ccc', textAlign: 'center', marginBottom: 20 }]}>
          Please check your details and try again.
        </Text>
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: COLORS.primary, marginBottom: 10 }]}
          onPress={() => setFailureModalVisible(false)}
        >
          <Text style={[FONTS.fontBaseSemiBold, { color: '#000', textAlign: 'center' }]}>
            Try Again
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
          onPress={() => setFailureModalVisible(false)}
        >
          <Text style={[FONTS.fontBaseSemiBold, { color: '#000', textAlign: 'center' }]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Pinned Header */}
      <Header title="Activate Card" leftIcon="back" leftAction={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Card Number Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            Card Number
          </Text>
          <View style={[styles.inputFieldContainer, { borderColor: colors.border || '#ccc' }]}>
            <TextInput
              style={[styles.inputField, { color: colors.text }]}
              placeholder="1234-1234-1234-1234"
              placeholderTextColor={colors.placeholder || '#aaa'}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
            />
            {cardNumber.length > 0 && (
              <Image
                source={isCardNumberValid ? IMAGES.checkMark : IMAGES.crossbadge}
                style={[styles.validationIcon, { tintColor: isCardNumberValid ? 'green' : 'red' }]}
              />
            )}
          </View>
          {cardNumberError ? <Text style={styles.errorText}>{cardNumberError}</Text> : null}
        </View>

        {/* Expiry Date Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            Expiry Date (MM-YY)
          </Text>
          <View style={[styles.inputFieldContainer, { borderColor: colors.border || '#ccc' }]}>
            <TextInput
              style={[styles.inputField, { color: colors.text }]}
              placeholder="MM-YY"
              placeholderTextColor={colors.placeholder || '#aaa'}
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              keyboardType="numeric"
            />
            {expiryDate.length > 0 && (
              <Image
                source={isExpiryValid ? IMAGES.checkMark : IMAGES.crossbadge}
                style={[styles.validationIcon, { tintColor: isExpiryValid ? 'green' : 'red' }]}
              />
            )}
          </View>
          {expiryError ? <Text style={styles.errorText}>{expiryError}</Text> : null}
        </View>

        {/* CVV Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            CVV
          </Text>
          <View style={[styles.inputFieldContainer, { borderColor: colors.border || '#ccc' }]}>
            <TextInput
              style={[styles.inputField, { color: colors.text }]}
              placeholder="Enter CVV"
              placeholderTextColor={colors.placeholder || '#aaa'}
              value={cvv}
              onChangeText={handleCvvChange}
              keyboardType="numeric"
              secureTextEntry
            />
            {cvv.length > 0 && (
              <Image
                source={isCvvValid ? IMAGES.checkMark : IMAGES.crossbadge}
                style={[styles.validationIcon, { tintColor: isCvvValid ? 'green' : 'red' }]}
              />
            )}
          </View>
          {cvvError ? <Text style={styles.errorText}>{cvvError}</Text> : null}
        </View>
      </ScrollView>

      {/* Pinned Continue Button */}
      <View style={[styles.continueButtonWrapper, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: activating ? '#999' : COLORS.primary },
          ]}
          onPress={handleContinue}
          disabled={activating}
        >
          <Text style={[FONTS.fontBaseMedium, { color: '#000', textAlign: 'center' }]}>
            {activating ? 'Activating Card...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {successModalVisible && <SuccessModal />}
      {failureModalVisible && <FailureModal />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#181818',
  },
  inputField: {
    flex: 1,
    paddingVertical: 15,
  },
  validationIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  continueButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#202020',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
  },
});

export default ActivateCard;