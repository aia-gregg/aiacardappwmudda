import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import * as Clipboard from 'expo-clipboard';

// Mapping for reason codes
const reasonMapping: { [key: string]: string } = {
  lost: '1',
  stolen: '2',
  fraud: '3',
};

export type CardOption = {
  name: string;
  balance: string;
};

export type ReasonOption = {
  label: string;
  value: string;
};

const ReportLoss = ({ navigation }: { navigation: any }) => {
  const { colors } = useTheme();

  // Dummy options
  const cardOptions: CardOption[] = [
    { name: 'Elite Card', balance: '$63,926' },
    { name: 'Standard Card', balance: '$10,000' },
    { name: 'Premium Card', balance: '$25,000' },
  ];

  const reasonOptions: ReasonOption[] = [
    { label: 'Lost', value: 'lost' },
    { label: 'Stolen', value: 'stolen' },
    { label: 'Fraud/Scam', value: 'fraud' },
  ];

  // States for selections, modals, and errors
  const [selectedCard, setSelectedCard] = useState<CardOption | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [errorCard, setErrorCard] = useState('');
  const [errorReason, setErrorReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [copied, setCopied] = useState(false);
  const [ticketCounter, setTicketCounter] = useState(10001000);

  // Modal visibility states for dropdowns
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [reasonModalVisible, setReasonModalVisible] = useState(false);

  const handleCopy = async (value: string) => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = () => {
    let valid = true;
    if (!selectedCard) {
      setErrorCard('Please select a card.');
      valid = false;
    } else {
      setErrorCard('');
    }
    if (!selectedReason) {
      setErrorReason('Please select a reason.');
      valid = false;
    } else {
      setErrorReason('');
    }
    if (!message.trim()) {
      setErrorMessage('This field is required.');
      valid = false;
    } else {
      setErrorMessage('');
    }
    if (!valid) return;

    const newCounter = ticketCounter + 1;
    setTicketCounter(newCounter);
    let baseStr = newCounter.toString().padStart(8, '0');
    const reasonCode = reasonMapping[selectedReason!] || '0';
    const generatedTicketId = baseStr[0] + reasonCode + baseStr.slice(2);
    setTicketId(generatedTicketId);
    setShowSuccessModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Overlay to detect outside clicks */}
      {(cardModalVisible || reasonModalVisible) && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={() => {
            setCardModalVisible(false);
            setReasonModalVisible(false);
          }}
        />
      )}

      <Header title="Report Loss" leftIcon="back" leftAction={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 150 }]}>
        {/* Card Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={[FONTS.fontSm, { color: "#BDBDBD", marginBottom: 6 }]}>Select Card</Text>
          <TouchableOpacity
            style={styles.dropdownBtn}
            onPress={() => {
              setCardModalVisible(true);
              setReasonModalVisible(false);
            }}
          >
            <Text style={[FONTS.font, { color: "#BDBDBD" }]}>
              {selectedCard ? selectedCard.name : 'Select Card'}
            </Text>
            <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
          </TouchableOpacity>
          {cardModalVisible && (
            <View style={styles.inlineDropdown}>
              {cardOptions.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownOption,
                    index === cardOptions.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => {
                    setSelectedCard(card);
                    setCardModalVisible(false);
                  }}
                >
                  <Text style={[FONTS.font, { color: "#BDBDBD" }]}>{card.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errorCard !== '' && <Text style={styles.errorText}>{errorCard}</Text>}
        </View>

        {/* Reason Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={[FONTS.fontSm, { color: "#BDBDBD", marginBottom: 6 }]}>Select Reason</Text>
          <TouchableOpacity
            style={styles.dropdownBtn}
            onPress={() => {
              setReasonModalVisible(true);
              setCardModalVisible(false);
            }}
          >
            <Text style={[FONTS.font, { color: "#BDBDBD" }]}>
              {selectedReason ? reasonOptions.find(r => r.value === selectedReason)?.label : 'Select Reason'}
            </Text>
            <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
          </TouchableOpacity>
          {reasonModalVisible && (
            <View style={styles.inlineDropdown}>
              {reasonOptions.map((reason, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownOption,
                    index === reasonOptions.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => {
                    setSelectedReason(reason.value);
                    setReasonModalVisible(false);
                  }}
                >
                  <Text style={[FONTS.font, { color: "#BDBDBD" }]}>{reason.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errorReason !== '' && <Text style={styles.errorText}>{errorReason}</Text>}
        </View>

        {/* Message Box */}
        <View style={styles.inputGroup}>
          <Text style={[FONTS.fontSm, { color: colors.text, marginBottom: 6 }]}>
            Additional Details
          </Text>
          <TextInput
             style={[styles.textArea, FONTS.font, { color: "#BDBDBD", borderColor: colors.border || '#fff' }]}
             placeholder="Please share some details about the incident."
             placeholderTextColor="#BDBDBD"
             value={message}
             onChangeText={setMessage}
             multiline
             numberOfLines={6}
          />
          {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
      </ScrollView>

      {/* Pinned Submit Button */}
      <View style={[styles.submitButtonWrapper, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: COLORS.primary }]}
          onPress={handleSubmit}
        >
          <Text style={[FONTS.fontBaseMedium, { color: '#000', textAlign: 'center' }]}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      {showSuccessModal && (
  <View style={styles.successModalOverlay}>
    <View style={styles.successModal}>
      <Text style={[FONTS.font, { color: "#BDBDBD", marginBottom: 20, fontSize: 15, textAlign: 'center' }]}>
        Your request has been submitted. Our team will get back to you shortly.
      </Text>
      <View style={styles.ticketBox}>
        <Text style={[FONTS.fontBaseSemiBold, { color: COLORS.white, flex: 1, textAlign: 'center', fontSize: 22 }]}>
          Ticket ID: {ticketId}
        </Text>
        <TouchableOpacity onPress={() => handleCopy(ticketId)}>
          <Image source={IMAGES.copy} style={[styles.copyIcon, { tintColor: COLORS.white, marginLeft: 10 }]} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.closeButton, { backgroundColor: COLORS.primary }]}
        onPress={() => setShowSuccessModal(false)}
      >
        <Text style={[FONTS.fontBaseMedium, { color: '#000' }]}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

      {/* Copied to Clipboard Modal */}
      {copied && (
        <View style={styles.copiedModalWrapper}>
          <Text style={styles.copiedModalText}>Copied to clipboard</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181818',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#303030',
  },
  dropdownIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  inlineDropdown: {
    backgroundColor: '#181818',
    borderRadius: SIZES.radius,
    marginTop: 5,
    zIndex: 2, // ensures dropdown is above the overlay
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
  },
  errorText: {
    color: COLORS.danger || 'red',
    fontSize: 12,
    marginTop: 5,
  },
  ticketBox: {
    width: '90%',
    borderColor: '#EFB900',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#141414',
    textAlignVertical: 'top',
    height: 120,
  },
  submitButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 10,
  },
  successModalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    width: '80%',
    backgroundColor: COLORS.dark3,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 250,
    alignContent: 'center',
    justifyContent : 'center',
  },
  ticketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
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
  copyIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
    marginLeft: 10,
  },
});

export default ReportLoss;