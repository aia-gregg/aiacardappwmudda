import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import * as Clipboard from 'expo-clipboard';

// CopiedModal component, similar to your PaywithCrypto.tsx
const CopiedModal = ({ message }: { message: string }) => (
  <View style={styles.copiedModalWrapper}>
    <Text style={styles.copiedModalText}>{message}</Text>
  </View>
);

const CardDetails = ({ navigation }: { navigation: any }) => {
  const {colors} : {colors : any} = useTheme();

  // Hardcoded card details
  const cardNumber = '1234 5678 9012 3456';
  const expiryDate = '12-25';
  const cvv = '123';
  const ascPassword = 'ASC12345';

  // State for showing the "copied" modal (model)
  const [copied, setCopied] = useState(false);

  const handleCopy = async (value: string) => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    // Hide the modal after 1.5 seconds
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Pinned Header */}
      <Header
        title="Card Details"
        leftIcon="back"
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Card Image (Left Aligned) */}
        <Image
          source={IMAGES.elitecard}
          style={styles.cardImage}
          resizeMode="contain"
        />

        {/* Card Number Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            Card Number
          </Text>
          <View style={styles.fieldValueContainer}>
            <Text style={[FONTS.font, styles.value, { color: colors.text }]}>
              {cardNumber}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(cardNumber)}>
              <Image source={IMAGES.copy} style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Expiry Date Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            Expiry Date (MM-YY)
          </Text>
          <View style={styles.fieldValueContainer}>
            <Text style={[FONTS.font, styles.value, { color: colors.text }]}>
              {expiryDate}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(expiryDate)}>
              <Image source={IMAGES.copy} style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* CVV Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            CVV
          </Text>
          <View style={styles.fieldValueContainer}>
            <Text style={[FONTS.font, styles.value, { color: colors.text }]}>
              {cvv}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(cvv)}>
              <Image source={IMAGES.copy} style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ASC Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={[FONTS.fontSm, styles.label, { color: colors.title }]}>
            ASC Password
          </Text>
          <View style={styles.fieldValueContainer}>
            <Text style={[FONTS.font, styles.value, { color: colors.text }]}>
              {ascPassword}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(ascPassword)}>
              <Image source={IMAGES.copy} style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer Text */}
        <Text style={[FONTS.fontXs, styles.disclaimer, { color: colors.text }]}>
          For your security, please keep these details confidential. Do not share your card number, expiry date, CVV, or ASC password with anyone. Remember: our team will never ask you to disclose this information. Protect your data to prevent unauthorized access.
        </Text>
      </ScrollView>

      {/* Copied to Clipboard Modal */}
      {copied && <CopiedModal message="Copied to clipboard" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardImage: {
    width: '80%', // Adjust width as needed
    height: 200,
    marginBottom: 30,
    alignSelf: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181818',
    padding: 15,
    borderRadius: 10,
  },
  value: {
    flex: 1,
  },
  copyIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
    marginLeft: 10,
  },
  disclaimer: {
    marginTop: 20,
    textAlign: 'left',
  },
  copiedModalWrapper: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -100 }],
    width: 200,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  copiedModalText: {
    ...FONTS.font,
    color: COLORS.white,
  },
});

export default CardDetails;