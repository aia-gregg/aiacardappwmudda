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
  Platform,
} from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

type WalletScreenProps = CompositeScreenProps<
  StackScreenProps<BottomTabParamList, 'Wallet'>,
  StackScreenProps<RootStackParamList>
>;

const WalletScreen = ({ navigation }: WalletScreenProps) => {
  const {colors} : {colors : any} = useTheme();

  // Card options from TopupPage.tsx
  const cardOptions = [
    { name: 'Elite Card', balance: '$63,926' },
    { name: 'Standard Card', balance: '$10,000' },
    { name: 'Premium Card', balance: '$25,000' },
  ];

  // State for card selection and dropdown visibility
  const [selectedCard, setSelectedCard] = useState(cardOptions[0]);
  const [cardDropdownVisible, setCardDropdownVisible] = useState<boolean>(false);

  // Function to handle linking to Apple and Google Pay.
  const handleLinkToWallet = () => {
    if (Platform.OS === 'ios') {
      console.log('Linking card to Apple Pay');
    } else {
      console.log('Linking card to Google Pay');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Pinned Main Header */}
      <Header
        title="Wallet"
        leftIcon="back"
        leftAction={() => navigation.navigate('Home')}
      />

      <ScrollView contentContainerStyle={[GlobalStyleSheet.container, { paddingTop: 30, paddingBottom: 10 }]}>
        {/* Top Bar: Card Selection & Balance (from TopupPage.tsx) */}
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

        {/* Four Icon Buttons */}
        <View style={styles.iconButtonRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Topup')}
          >
            <View style={styles.iconContainer}>
              <Image source={IMAGES.deposit2} style={styles.iconImage} />
            </View>
            <Text style={[FONTS.fontXs, styles.iconLabel, { color: colors.title }]}>Top Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('CardDetails')}
          >
            <View style={styles.iconContainer}>
              <Image source={IMAGES.transfer} style={styles.iconImage} />
            </View>
            <Text style={[FONTS.fontXs, styles.iconLabel, { color: colors.title }]}>Card Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('ReportLoss')}
          >
            <View style={styles.iconContainer}>
              <Image source={IMAGES.grid} style={styles.iconImage} />
            </View>
            <Text style={[FONTS.fontXs, styles.iconLabel, { color: colors.title }]}>Report Loss</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleLinkToWallet}
          >
            <View style={styles.iconContainer}>
              <Image source={IMAGES.addwallet} style={styles.iconImage} />
            </View>
            <Text style={[FONTS.fontXs, styles.iconLabel, { color: colors.title }]}>Add to Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Two Main Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
            onPress={() => navigation.navigate('CardSelect')}
          >
            <Text style={[FONTS.fontBaseMedium, { color: '#000', textAlign: 'center' }]}>
              Buy New Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.primary, marginTop: 10 }]}
            onPress={() => navigation.navigate('ActivateCard')}
          >
            <Text style={[FONTS.fontBaseMedium, { color: '#000', textAlign: 'center' }]}>
              Activate Card
            </Text>
          </TouchableOpacity>
        </View>

        {/* Referral Section */}
        <View style={styles.referralSection}>
          <Text style={styles.referralHeader}>Share Your Referral Link</Text>

          <View style={styles.referralInputContainer}>
            <Text style={styles.referralLabel}>Referral ID</Text>
            <View style={styles.referralInputWrapper}>
              <Text style={styles.referralInput}>AZ19ZGSH</Text>
              <TouchableOpacity style={styles.copyIconContainer}>
                <Image source={IMAGES.copy} style={styles.copyIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.referralInputContainer}>
            <Text style={styles.referralLabel}>Referral Link</Text>
            <View style={styles.referralInputWrapper}>
              <Text style={styles.referralInput}>https://yourapp.com/referral/AZ19ZGSH</Text>
              <TouchableOpacity style={styles.copyIconContainer}>
                <Image source={IMAGES.copy} style={styles.copyIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.referralDashboardButton}
            onPress={() => navigation.navigate('Referral')}
          >
            <Text style={[FONTS.fontBaseMedium, { color: '#000', textAlign: 'center' }]}>
              View Referral Dashboard
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dropdown Modal for Card Selection */}
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    // marginTop: 0,
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
  iconButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#4a5157',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  iconLabel: {
    ...FONTS.fontXs,
    textAlign: 'center',
    marginTop: 4,
  },
  actionButtonsContainer: {
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  referralSection: {
    borderRadius: SIZES.radius,
    backgroundColor: "#181818",
    paddingHorizontal: 18,
    paddingVertical: 25,
    marginBottom: 20,
  },
  referralHeader: {
    ...FONTS.h4,
    textAlign: 'left',
    marginBottom: 18,
    color: COLORS.white,
    fontSize: 18,
  },
  referralInputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  referralLabel: {
    ...FONTS.fontXs,
    marginBottom: 6,
    color: COLORS.grey,
  },
  referralInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#303030",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 48,
  },
  referralInput: {
    flex: 1,
    ...FONTS.font,
    color: '#fff',
  },
  copyIconContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: "#fff",
  },
  referralDashboardButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default WalletScreen;