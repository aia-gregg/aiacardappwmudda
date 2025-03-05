import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import PaymentSuccessModal from '../../components/Modal/PaymentSuccessModal';
import PaymentFailedModal from '../../components/Modal/PaymentFailedModal';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type PayWithCryptoScreenProps = StackScreenProps<RootStackParamList, 'PayWithCrypto'>;

// Example fallback card if no card is passed
const defaultCard = {
  title: 'Default Card',
  price: '$1',
  dailyLimit: '',
  monthlyLimit: '',
  topupFees: '',
  transactionFees: '',
  fxFees: '',
  applePay: false,
  googlePay: false,
  kycRequirement: '',
  image: IMAGES.defaultTokenIcon,
};

const PayWithCrypto = ({ navigation, route }: PayWithCryptoScreenProps) => {
  const { colors } = useTheme();

  // Retrieve the chosenCard & chosenCrypto from route.params
  const chosenCard = route.params?.chosenCard || defaultCard;
  const chosenCrypto = route.params?.chosenCrypto;

  // Parse card price
  const cardPriceString = chosenCard.price || '$1';
  const cardPrice = parseFloat(cardPriceString.replace('$', ''));

  // Crypto info
  const cryptoName = chosenCrypto?.name || 'DEFAULT';
  const cryptoDisplay = chosenCrypto?.display || 'Default Crypto';
  const cryptoIcon = chosenCrypto?.icon || IMAGES.defaultTokenIcon;

  // Manage coin price state
  const [fetchedCoinPrice, setFetchedCoinPrice] = useState<number>(cardPrice);

  const fetchCoinPrice = async () => {
    if (!cryptoName) return;
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptoName}&convert=USD`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': '8028e79e-0f12-416e-8bd9-827bb607bb9a',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const json = await response.json();
      const newCoinPrice = json.data[cryptoName]?.quote?.USD?.price;
      const updatedPrice = newCoinPrice ? newCoinPrice : cardPrice;
      console.log('Price fetched. Current fetched price:', updatedPrice);
      setFetchedCoinPrice(updatedPrice);
    } catch (error) {
      console.error('Error fetching coin price:', error);
      setFetchedCoinPrice(cardPrice);
    }
  };

  useEffect(() => {
    fetchCoinPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate amounts
  const vat = cardPrice * 0.05;
  const totalUSD = cardPrice + vat;
  const cryptoAmount = (totalUSD / fetchedCoinPrice).toFixed(6);

  // Timer logic for 15 minutes (900 seconds)
  const [timer, setTimer] = useState<number>(900);
  const [showPriceRefreshModal, setShowPriceRefreshModal] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setShowPriceRefreshModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleRefreshPrice = async () => {
    console.log('Refreshing coin price...');
    await fetchCoinPrice();
    console.log('Price refreshed. Current fetched price:', fetchedCoinPrice);
    setTimer(900);
    setShowPriceRefreshModal(false);
  };

  // Payment flow simulation
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailedModal, setShowFailedModal] = useState<boolean>(false);

  // For clipboard copy modal
  const [showCopiedModal, setShowCopiedModal] = useState<boolean>(false);

  const walletAddress = '9vYDgvoN5mgEUs5HtJwZXAYn7zP51WPB1nGLQRFTQH7u';

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(walletAddress);
    setShowCopiedModal(true);
    setTimeout(() => setShowCopiedModal(false), 1500);
  };

  const handlePaymentComplete = () => {
    if (isVerifying) return;
    setIsVerifying(true);
    setTimeout(() => {
      const verified = Math.random() < 0.7;
      setIsVerifying(false);
      if (verified) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate('DrawerNavigation', { screen: 'Home' });
        }, 2000);
      } else {
        setShowFailedModal(true);
        setTimeout(() => {
          setShowFailedModal(false);
          navigation.navigate('CardSelect');
        }, 2000);
      }
    }, 3000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <Header title="Pay with Crypto" leftIcon="back" leftAction={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}>
        <View style={GlobalStyleSheet.container}>
          {/* Top Section: Token + Timer */}
          <View style={styles.topSection}>
            <View style={styles.selectedTokenBox}>
              <Image source={cryptoIcon} style={styles.tokenIcon} />
              <Text style={[FONTS.fontBaseSemiBold, { color: COLORS.white, fontSize: 18, marginLeft: 8 }]}>
                {cryptoDisplay}
              </Text>
            </View>
            <View style={styles.timerBox}>
              <Text style={[FONTS.fontBaseSemiBold, { color: COLORS.white, fontSize: 18 }]}>
                {formatTime(timer)}
              </Text>
            </View>
          </View>

          {/* Amount Section */}
          <View style={styles.amountSection}>
            <Text style={[FONTS.fontLg, { color: COLORS.white, marginBottom: 5 }]}>
              Amount to Send:
            </Text>
            <Text style={[FONTS.fontBaseSemiBold, { color: COLORS.white, fontSize: 22 }]}>
              {cryptoAmount} {cryptoName}
            </Text>
          </View>

          {/* QR Code */}
          <View style={styles.qrSection}>
            <QRCode value={walletAddress} size={200} color="#fff" backgroundColor="#000" />
          </View>

          {/* Wallet Address */}
          <View style={styles.addressSection}>
            <Text style={[FONTS.font, { color: COLORS.white, textAlign: 'center' }]}>
              Wallet Address:
            </Text>
            <View style={styles.addressBox}>
  <Text
    style={[
      FONTS.font,
      { color: COLORS.white, flex: 1, fontSize: 12, textAlign: 'center', flexWrap: 'wrap' },
    ]}
    numberOfLines={2}  // Allow up to 2 lines
  >
    {walletAddress}
  </Text>
  <TouchableOpacity onPress={handleCopyAddress} style={styles.copyButton}>
    <Image source={IMAGES.copy} style={styles.copyIcon} />
  </TouchableOpacity>
</View>
            <Text style={[FONTS.fontXs, { color: COLORS.grey, fontSize: 9.5, textAlign: 'center', marginTop: 10 }]}>
              Please verify the wallet address, network, and amount before sending funds. Note that network fees may apply, so ensure the total amount covers both the payment and fees. For example, with USDT on the TRC20 network, a 1 USDT fee may be charged. If sending 49 USDT, send 50 to cover fees and avoid losing funds.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Pinned Section: Locked Price, Invoice + Button */}
      <View style={styles.bottomWrapper}>
        {/* Locked Price Section */}
        <View style={styles.lockedPriceContainer}>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Locked Price</Text>
            <Text style={styles.invoiceValue}>
              1 {cryptoName} = ${fetchedCoinPrice.toFixed(6)}
            </Text>
          </View>
        </View>

        {/* Invoice Section */}
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
            <Text style={[styles.invoiceValue, styles.invoiceTotalValue]}>${totalUSD.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.fullWidthButton,
            { backgroundColor: COLORS.primary, opacity: isVerifying ? 0.6 : 1 },
          ]}
          onPress={isVerifying ? undefined : handlePaymentComplete}
          disabled={isVerifying}
        >
          <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
            {isVerifying ? 'Verifying Payment...' : 'Payment Complete'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Centered Modals for Payment Outcome */}
      {showSuccessModal && (
        <View style={styles.centeredModal}>
          <PaymentSuccessModal />
        </View>
      )}
      {showFailedModal && (
        <View style={styles.centeredModal}>
          <PaymentFailedModal />
        </View>
      )}

      {/* Bottom Modal for Copy Confirmation */}
      {showCopiedModal && (
        <View style={styles.copiedModalWrapper}>
          <Text style={styles.copiedModalText}>Copied to clipboard</Text>
        </View>
      )}

      {/* Price Refresh Modal */}
      {showPriceRefreshModal && (
        <Modal transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Text style={[FONTS.h4, { color: '#fff', marginBottom: 15 }]}>
                Your locked price has expired.
              </Text>
              <Text style={[FONTS.font, { color: '#ccc', marginBottom: 20, textAlign: 'center' }]}>
                Please refresh to get the latest price and start a new 15-minute lock period.
              </Text>
              <TouchableOpacity
                style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
                onPress={handleRefreshPrice}
              >
                <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
                  Refresh Price
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // --- Layout sections ---
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedTokenBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  tokenIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  timerBox: {
    borderWidth: 1,
    borderColor: '#efb900',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountSection: {
    marginBottom: 10,
    alignItems: 'center',
  },
  qrSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  addressSection: {
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 5,
  },
  copyButton: {
    marginLeft: 10,
  },
  copyIcon: {
    height: 18,
    width: 18,
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },

  // --- Bottom Section ---
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
  lockedPriceContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#efb900',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },

  // --- Modal Styles ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedModalWrapper: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  copiedModalText: {
    backgroundColor: '#222',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    ...FONTS.font,
    color: COLORS.white, // this will override any color from FONTS.font
  },
});

export default PayWithCrypto;