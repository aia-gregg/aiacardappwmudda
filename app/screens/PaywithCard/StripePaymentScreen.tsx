import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image as RNImage,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import PaymentSuccessModal from '../../components/Modal/PaymentSuccessModal';
import PaymentFailedModal from '../../components/Modal/PaymentFailedModal';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useStripe } from '@stripe/stripe-react-native';
import { IMAGES } from '../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../backend/config';

const defaultCard = {
  title: 'Default Card',
  price: '$1',
  image: IMAGES.defaultTokenIcon,
  dailyLimit: '',
  monthlyLimit: '',
  topupFees: '',
  transactionFees: '',
  fxFees: '',
  applePay: false,
  googlePay: false,
  kycRequirement: '',
};

type StripePaymentScreenProps = StackScreenProps<RootStackParamList, 'StripePaymentScreen'>;

const StripePaymentScreen = ({ navigation, route }: StripePaymentScreenProps) => {
  const { colors } = useTheme();
  const chosenCard = route.params?.chosenCard || defaultCard;

  // Calculate invoice amounts
  const cardPrice = parseFloat(chosenCard.price.replace('$', ''));
  const vat = cardPrice * 0.05;
  const totalUSD = cardPrice + vat;

  // Stripe PaymentSheet integration
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentSheetInitialized, setPaymentSheetInitialized] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailedModal, setShowFailedModal] = useState<boolean>(false);

  // Fetch PaymentSheet parameters from backend
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_BASE_URL}/payment-sheet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(totalUSD * 100), // dollars to cents
      }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return { paymentIntent, ephemeralKey, customer };
  };

  // Initialize the PaymentSheet
  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        merchantDisplayName: 'AiaCard',
        returnURL: 'aiacard://stripe-redirect', // Ensure your app handles this deep link
      });
      if (error) {
        console.error('Error initializing PaymentSheet:', error);
      } else {
        console.log('PaymentSheet initialized successfully.');
        setPaymentSheetInitialized(true);
      }
    } catch (error) {
      console.error('Error fetching PaymentSheet parameters:', error);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  // ================= New Code: callCreateCardholder Function =================
  const callCreateCardholder = async () => {
    // Retrieve stored user data (adjust source as needed)
    const userDataStr = await AsyncStorage.getItem('userData');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    if (!userData) {
      console.error("No user data available for creating cardholder");
      return;
    }
    
    // Prepare the payload with required parameters
    const payload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      areaCode: userData.areaCode || "+1",
      mobile: userData.mobile,
      birthday: userData.birthday,
      address: userData.address,
      town: userData.town,
      postCode: userData.postCode,
      country: userData.country,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/create-cardholder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Create Cardholder API result:", result);
    } catch (error) {
      console.error("Error calling create cardholder endpoint:", error);
    }
  };
  // ==========================================================================

  const openPaymentSheet = async () => {
    if (!paymentSheetInitialized) {
      Alert.alert('Payment sheet is not ready. Please try again later.');
      return;
    }
    setLoading(true);
    const { error } = await presentPaymentSheet();
    if (error) {
      setShowFailedModal(true);
      setTimeout(() => setShowFailedModal(false), 2000);
    } else {
      // Payment succeeded, now call backend to create cardholder in WasabiCard
      await callCreateCardholder();
      
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('DrawerNavigation', { screen: 'Home' });
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <Header title="Pay with Card" leftIcon="back" leftAction={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}>
        <View style={GlobalStyleSheet.container}>
          {/* Order Review Header */}
          <Text style={[FONTS.h4, styles.orderReviewText]}>
            Review Your Order
          </Text>
          {/* Card Review Section */}
          <View style={styles.cardReviewContainer}>
            <View style={styles.reviewImageContainer}>
              <RNImage source={chosenCard.image} style={styles.reviewCardImage} />
            </View>
            <View style={styles.reviewDetailsContainer}>
              <Text style={[FONTS.h4, { color: COLORS.white, fontSize: 18 }]}>
                {chosenCard.title}
              </Text>
              {chosenCard.dailyLimit ? (
                <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
                  Daily Limit: {chosenCard.dailyLimit}
                </Text>
              ) : null}
              {chosenCard.monthlyLimit ? (
                <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
                  Monthly Limit: {chosenCard.monthlyLimit}
                </Text>
              ) : null}
              {chosenCard.topupFees ? (
                <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
                  Topup Fee: {chosenCard.topupFees}
                </Text>
              ) : null}
              {chosenCard.transactionFees ? (
                <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
                  Txn Fee: {chosenCard.transactionFees}
                </Text>
              ) : null}
              {chosenCard.fxFees ? (
                <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
                  FX Fee: {chosenCard.fxFees}
                </Text>
              ) : null}
              {(chosenCard.applePay !== undefined && chosenCard.googlePay !== undefined) && (
                <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
                  Apple & Google Pay: {chosenCard.applePay && chosenCard.googlePay ? 'Yes' : 'No'}
                </Text>
              )}
            </View>
          </View>
          {/* Invoice Details */}
          <View style={styles.invoiceContainer}>
            <View style={styles.invoiceRow}>
              <Text style={styles.invoiceLabel}>Card Price</Text>
              <Text style={styles.invoiceValue}>${cardPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.invoiceRow}>
              <Text style={styles.invoiceLabel}>VAT (5%)</Text>
              <Text style={styles.invoiceValue}>${vat.toFixed(2)}</Text>
            </View>
            <View style={styles.invoiceDivider} />
            <View style={styles.invoiceRow}>
              <Text style={[styles.invoiceLabel, styles.invoiceTotalLabel]}>Total</Text>
              <Text style={[styles.invoiceValue, styles.invoiceTotalValue]}>
                ${totalUSD.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Section: Payment Button */}
      <View style={styles.bottomWrapper}>
        <TouchableOpacity
          style={[
            styles.fullWidthButton,
            { backgroundColor: paymentSheetInitialized ? COLORS.primary : '#888' },
          ]}
          onPress={loading || !paymentSheetInitialized ? undefined : openPaymentSheet}
          disabled={loading || !paymentSheetInitialized}
        >
          <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
            {loading ? 'Processing Payment...' : (paymentSheetInitialized ? 'Proceed to Payment' : 'Loading...')}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Centered Outcome Modals */}
      {showSuccessModal && (
        <View style={styles.modalWrapper}>
          <PaymentSuccessModal />
        </View>
      )}
      {showFailedModal && (
        <View style={styles.modalWrapper}>
          <PaymentFailedModal />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  orderReviewText: {
    textAlign: 'left',
    marginBottom: 15,
    ...FONTS.h4,
    color: COLORS.white,
    fontSize: 20,
  },
  cardReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#efb900',
    borderRadius: SIZES.radius,
    padding: 10,
  },
  reviewImageContainer: {
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewCardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  reviewDetailsContainer: {
    width: '45%',
    paddingLeft: 10,
  },
  invoiceContainer: {
    marginBottom: 15,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  invoiceLabel: {
    ...FONTS.font,
    color: COLORS.white,
  },
  invoiceValue: {
    ...FONTS.font,
    color: COLORS.white,
  },
  invoiceDivider: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    marginVertical: 6,
  },
  invoiceTotalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  invoiceTotalValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#101010',
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default StripePaymentScreen;
