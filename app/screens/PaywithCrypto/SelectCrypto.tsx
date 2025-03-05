import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { useTheme } from '@react-navigation/native';

type SelectCryptoScreenProps = StackScreenProps<RootStackParamList, 'SelectCrypto'>;

interface CryptoOption {
  name: string;
  network: string;
  display: string;
  icon: any;
}

// Full list of tokens with main networks
const cryptoOptions: CryptoOption[] = [
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

const SelectCrypto = ({ navigation, route }: SelectCryptoScreenProps) => {
  const { colors } : { colors: any } = useTheme();
  const pageBackground = '#000';

  // Get the chosen card object passed from the previous screen
  const { chosenCard } = route.params;

  // Track which crypto is selected
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Handler for selecting a crypto option
  const handleSelectCrypto = (index: number) => {
    setSelectedIndex(index);
  };

  // Render a single crypto row
  const renderCrypto = (cryptoItem: CryptoOption, index: number) => {
    const isSelected = selectedIndex === index;
    return (
      <TouchableOpacity
        key={`${cryptoItem.name}-${cryptoItem.network}-${index}`}
        activeOpacity={0.8}
        style={[
          styles.cryptoContainer,
          {
            backgroundColor: colors.input,
            borderColor: isSelected ? COLORS.primary : COLORS.borderColor2,
          },
        ]}
        onPress={() => handleSelectCrypto(index)}
      >
        <View style={styles.imageContainer}>
          {cryptoItem.icon ? (
            <Image source={cryptoItem.icon} style={styles.cryptoIcon} />
          ) : (
            <Image source={IMAGES.defaultTokenIcon} style={styles.cryptoIcon} />
          )}
        </View>
        <View style={styles.cryptoDetails}>
          <Text style={[FONTS.fontBaseMedium, { color: colors.title, fontSize: 16 }]}>
            {cryptoItem.display}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkMarkContainer}>
            <Image source={IMAGES.checkMark} style={styles.checkMark} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const handleContinue = () => {
    // Navigate to the next screen, passing both the chosen card and the chosen crypto option
    navigation.navigate('PayWithCrypto', { 
      chosenCard: chosenCard, 
      chosenCrypto: cryptoOptions[selectedIndex] 
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pageBackground }}>
      <Header
        title="Select Crypto"
        leftIcon="back"
        leftAction={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 125, paddingTop: 10 }}>
        <View style={GlobalStyleSheet.container}>
          <View style={{ marginVertical: 10 }}>
            {cryptoOptions.map((cryptoItem, index) =>
              renderCrypto(cryptoItem, index)
            )}
          </View>
        </View>
      </ScrollView>
      {/* Pinned bottom area with "Continue" button and selected token display */}
      <View style={styles.bottomWrapper}>
        <Text style={[FONTS.fontBaseSemiBold, { color: COLORS.white, marginBottom: 10, textAlign: 'center', fontSize: 18 }]}>
          Selected: {cryptoOptions[selectedIndex].display}
        </Text>
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
          onPress={handleContinue}
        >
          <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cryptoContainer: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  imageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 1,
    marginLeft: 10,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cryptoDetails: {
    width: '60%',
    justifyContent: 'center',
  },
  checkMarkContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  checkMark: {
    width: 20,
    height: 20,
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
    borderTopWidth: 1,
    borderTopColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default SelectCrypto;