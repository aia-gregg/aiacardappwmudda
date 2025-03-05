import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme, CompositeScreenProps } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import Select from '../../components/Input/Select';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';

type TopUpPageScreenProps = CompositeScreenProps<
  StackScreenProps<BottomTabParamList, 'Topup'>,
  StackScreenProps<RootStackParamList>
>;

const cardOptions = [
  { name: 'Elite Card', balance: '$63,926' },
  { name: 'Standard Card', balance: '$10,000' },
  { name: 'Premium Card', balance: '$25,000' },
];

const quickAmounts = [50, 100, 250, 500, 1000, 5000];

const cryptoList = [
  { name: 'USDT', network: 'Tron (TRC-20)', display: 'USDT - Tron (TRC-20)', icon: IMAGES.usdt },
  { name: 'USDT', network: 'Ethereum (ERC-20)', display: 'USDT - Ethereum (ERC-20)', icon: IMAGES.usdt },
  { name: 'USDT', network: 'Solana (SPL)', display: 'USDT - Solana (SPL)', icon: IMAGES.usdt },
  { name: 'USDT', network: 'BNB Chain (BEP-20)', display: 'USDT - BNB Chain (BEP-20)', icon: IMAGES.usdt },
  { name: 'AIAT', network: 'Ethereum (ERC-20)', display: 'AIAT - Ethereum (ERC-20)', icon: IMAGES.aiat },
  { name: 'CCO2', network: 'Ethereum (ERC-20)', display: 'CCO2 - Ethereum (ERC-20)', icon: IMAGES.cco2 },
  { name: 'SOL', network: 'Solana (SPL)', display: 'SOL - Solana (SPL)', icon: IMAGES.sol },
  { name: 'SOL', network: 'Ethereum (ERC-20)', display: 'SOL - Ethereum (ERC-20)', icon: IMAGES.sol },
  { name: 'SOL', network: 'BNB Chain (BEP-20)', display: 'SOL - BNB Chain (BEP-20)', icon: IMAGES.sol },
  { name: 'BTC', network: 'Bitcoin', display: 'BTC - Bitcoin', icon: IMAGES.btc },
  { name: 'BTC', network: 'Solana (SPL)', display: 'BTC - Solana (SPL)', icon: IMAGES.btc },
  { name: 'BTC', network: 'Ethereum (ERC-20)', display: 'BTC - Ethereum (ERC-20)', icon: IMAGES.btc },
  { name: 'ETH', network: 'Ethereum (ERC-20)', display: 'ETH - Ethereum (ERC-20)', icon: IMAGES.eth },
  { name: 'ETH', network: 'BNB Chain (BEP-20)', display: 'ETH - BNB Chain (BEP-20)', icon: IMAGES.eth },
  { name: 'BNB', network: 'Ethereum (ERC-20)', display: 'BNB - Ethereum (ERC-20)', icon: IMAGES.bnb },
  { name: 'BNB', network: 'Solana (SPL)', display: 'BNB - Solana (SPL)', icon: IMAGES.bnb },
  { name: 'XRP', network: 'Ripple (XRPL)', display: 'XRP - Ripple (XRPL)', icon: IMAGES.xrp },
  { name: 'XRP', network: 'Ethereum (ERC-20)', display: 'XRP - Ethereum (ERC-20)', icon: IMAGES.xrp },
  { name: 'XRP', network: 'BNB Chain (BEP-20)', display: 'XRP - BNB Chain (BEP-20)', icon: IMAGES.xrp },
  { name: 'USDC', network: 'Ethereum (ERC-20)', display: 'USDC - Ethereum (ERC-20)', icon: IMAGES.usdc },
  { name: 'USDC', network: 'Solana (SPL)', display: 'USDC - Solana (SPL)', icon: IMAGES.usdc },
  { name: 'USDC', network: 'BNB Chain (BEP-20)', display: 'USDC - BNB Chain (BEP-20)', icon: IMAGES.usdc },
  { name: 'USDC', network: 'Tron (TRC-20)', display: 'USDC - Tron (TRC-20)', icon: IMAGES.usdc },
];

const TopUpPage = ({ navigation }: TopUpPageScreenProps) => {
  const { colors }: { colors: any } = useTheme();

  // Set the default selected card to be the first option in cardOptions
  const [selectedCard, setSelectedCard] = useState(cardOptions[0]);
  const [cardDropdownVisible, setCardDropdownVisible] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  // Set first crypto (index 0) as default
  const [selectedCryptoIndex, setSelectedCryptoIndex] = useState<number | null>(0);
  const [errors, setErrors] = useState<{ amount?: string; crypto?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Helper function: Format number with thousand separators
  const formatNumber = (num: number | string) => {
    const number = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
    return isNaN(number) ? '' : number.toLocaleString();
  };

  // Render each crypto item with individual selection
  const renderCryptoItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = selectedCryptoIndex === index;
    return (
      <TouchableOpacity
        style={[
          styles.cryptoItem,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? "#EFB900" : COLORS.grey,
          },
        ]}
        onPress={() => setSelectedCryptoIndex(index)}
        activeOpacity={0.9}
      >
        <Image source={item.icon} style={styles.cryptoIcon} />
        <Text style={[FONTS.fontSm, { color: colors.title, marginTop: 4 }]}>{item.display}</Text>
        {isSelected && (
          <View style={styles.checkMarkContainer}>
            <Image source={IMAGES.checkMark} style={styles.checkMark} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Handler for Continue button press
  const handleContinue = () => {
    let valid = true;
    let currentErrors: { amount?: string; crypto?: string } = {};

    // Validate topup amount
    const numericAmount = parseFloat(topUpAmount.replace(/,/g, ''));
    if (isNaN(numericAmount) || numericAmount < 15) {
      currentErrors.amount = 'Minimum topup amount is $15';
      valid = false;
    }

    // Validate crypto selection
    if (selectedCryptoIndex === null) {
      currentErrors.crypto = 'Please select a crypto';
      valid = false;
    }

    setErrors(currentErrors);

    if (!valid) {
      return;
    }

    setIsLoading(true);
    // Simulate a delay before navigation and pass the data to TopupCrypto.tsx
    setTimeout(() => {
      navigation.navigate('TopupCrypto', {
        card: selectedCard,
        topupAmount: topUpAmount.toString(),
        chosenCrypto: cryptoList[selectedCryptoIndex!],
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Pinned Header */}
      <Header title="Topup" leftIcon="back" leftAction={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={[GlobalStyleSheet.container, styles.container]}>
        {/* Top Bar: Card Selection & Balance */}
        <View style={styles.topBar}>
          <View style={styles.cardInfo}>
            <Text style={[FONTS.fontSm, styles.cardName, { color: colors.title }]}>
              Total Balance
            </Text>
            <Text style={[FONTS.h2, styles.cardBalance, { color: colors.title }]}>
              {selectedCard.balance}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.dropdownBtn}
            onPress={() => setCardDropdownVisible(true)}
          >
            <Text style={[FONTS.fontSm, { color: colors.title }]}>
              {selectedCard.name ? selectedCard.name : "Select Card"}
            </Text>
            <Image source={IMAGES.dropdown} style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[FONTS.fontSm, { color: colors.text, marginBottom: 6 }]}>
            Enter Topup Amount
          </Text>
          <Input
            placeholder="Amount"
            value={topUpAmount}
            onChangeText={(text) => {
              const numericText = text.replace(/,/g, '');
              setTopUpAmount(formatNumber(numericText));
              if (selectedQuickAmount && parseFloat(numericText) !== selectedQuickAmount) {
                setSelectedQuickAmount(null);
              }
            }}
            keyboardType="numeric"
          />
          {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        </View>

        {/* Quick Action Buttons in Two Rows */}
        <View style={styles.quickActionsContainer}>
          {quickAmounts.map((amountVal, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.quickActionButton,
                {
                  backgroundColor:
                    selectedQuickAmount === amountVal ? COLORS.primary : colors.card,
                },
              ]}
              onPress={() => {
                setSelectedQuickAmount(amountVal);
                setTopUpAmount(formatNumber(amountVal));
              }}
            >
              <Text style={[FONTS.fontSm, { color: selectedQuickAmount === amountVal ? '#000' : colors.title }]}>
                ${formatNumber(amountVal)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Select Crypto Section - Vertical Scroll */}
        <View style={styles.cryptoSection}>
          <Text style={[FONTS.h5, { color: colors.title, marginBottom: 10 }]}>Select Crypto</Text>
          <View style={styles.cryptoListContainer}>
            {cryptoList.map((item, index) => (
              <React.Fragment key={`${item.name}-${item.network}`}>
                {renderCryptoItem({ item, index })}
              </React.Fragment>
            ))}
          </View>
          {errors.crypto && <Text style={styles.errorText}>{errors.crypto}</Text>}
        </View>
      </ScrollView>

      {/* Pinned Bottom Section */}
      <View style={styles.bottomWrapper}>
        {/* Summary Section in 3 Lines */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={[FONTS.fontSm, { color: COLORS.white }]}>Selected Card:</Text>
            <Text style={[FONTS.fontSm, { color: COLORS.white }]}>{selectedCard.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[FONTS.fontSm, { color: COLORS.white }]}>Topup Amount:</Text>
            <Text style={[FONTS.fontSm, { color: COLORS.white }]}>${topUpAmount || '0'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[FONTS.fontSm, { color: COLORS.white }]}>Selected Crypto:</Text>
            <Text style={[FONTS.fontSm, { color: COLORS.white }]}>
              {selectedCryptoIndex !== null ? cryptoList[selectedCryptoIndex].display : 'None'}
            </Text>
          </View>
        </View>

        {/* Pinned Continue Button */}
        <View style={styles.continueButtonWrapper}>
          <TouchableOpacity
            style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
              {isLoading ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dummy Card Dropdown Modal */}
      {cardDropdownVisible && (
        <TouchableWithoutFeedback onPress={() => setCardDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.dropdownModal} activeOpacity={1}>
              {cardOptions.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.cardOption}
                  onPress={() => {
                    setSelectedCard(card);
                    setCardDropdownVisible(false);
                  }}
                >
                  <Text style={[FONTS.fontSm, { color: colors.title }]}>
                    {card.name} - {card.balance}
                  </Text>
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 210,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#efb900',
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    ...FONTS.fontSm,
    marginBottom: 4,
  },
  cardBalance: {
    ...FONTS.fontBaseSemiBold,
    lineHeight: 40,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#181818",
    borderColor: "#4a5157",
    color: "#fffff",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: SIZES.radius,
  },
  dropdownIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 20,
    tintColor: COLORS.white,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    width: '32%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.dark2,
    alignItems: 'center',
    marginVertical: 5,
    marginTop: 5,
  },
  cryptoSection: {
    marginTop: 10,
  },
  cryptoListContainer: {
    paddingVertical: 10,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 20,
    marginLeft: 5,
  },
  checkMarkContainer: {
    position: 'absolute',
    alignSelf: 'center',
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 2,
  },
  checkMark: {
    width: 25,
    height: 25,
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 25,
    paddingHorizontal: 15,
    paddingBottom:35,
  },
  summarySection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#101010',
    borderRadius: 8,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  continueButtonWrapper: {
    marginTop: 5,
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    paddingLeft: 130,
  },
  dropdownModal: {
    backgroundColor: COLORS.dark3,
    borderRadius: 8,
    padding: 20,
    width: 250,
    alignSelf: 'center',
  },
  cardOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#202020",
  },
  errorText: {
    color: COLORS.danger,
    marginTop: 5,
    fontSize: 12,
  },
});

export default TopUpPage;