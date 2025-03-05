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

type CardSelectScreenProps = StackScreenProps<RootStackParamList, 'CardSelect'>;

interface CardOption {
  title: string;
  price: string;
  dailyLimit: string;
  monthlyLimit: string;
  topupFees: string;
  transactionFees: string;
  fxFees: string;
  applePay: boolean;
  googlePay: boolean;
  kycRequirement: string;
  image: any;
}

// Sample static card data with additional details
const cardOptions: CardOption[] = [
  {
    title: 'Lite (Virtual)',
    price: '$49',
    dailyLimit: '$250K',
    monthlyLimit: '$15M',
    topupFees: '3.5%',
    transactionFees: '$0.30',
    fxFees: '0-1%',
    applePay: true,
    googlePay: true,
    kycRequirement: 'Basic',
    image: IMAGES.standardcard,
  },
  {
    title: 'Pro (Virtual)',
    price: '$99',
    dailyLimit: '$500K',
    monthlyLimit: '$30M',
    topupFees: '3.5%',
    transactionFees: '$0.30',
    fxFees: '0-1%',
    applePay: true,
    googlePay: true,
    kycRequirement: 'Full',
    image: IMAGES.premiumcard,
  },
  {
    title: 'Elite Card',
    price: '$149',
    dailyLimit: '$1M',
    monthlyLimit: '$30M',
    topupFees: '3.5%',
    transactionFees: '$0.30',
    fxFees: '0-1%',
    applePay: true,
    googlePay: true,
    kycRequirement: 'Full',
    image: IMAGES.elitecard,
  },
];

const CardSelect = ({ navigation }: CardSelectScreenProps) => {
  const { colors } : { colors: any } = useTheme();
  const pageBackground = '#000';

  // Set the first card as the default selected card.
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [activePaymentOption, setActivePaymentOption] = useState<string | null>(null);

  // Handler when a card is selected
  const handleCardSelect = (index: number) => {
    setSelectedCardIndex(index);
    // Reset any previously selected payment option
    setActivePaymentOption(null);
  };

  // Render a single card option
  const renderCard = (card: CardOption, index: number) => {
    const isSelected = selectedCardIndex === index;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleCardSelect(index)}
        activeOpacity={0.8}
        style={[
          styles.cardContainer,
          { backgroundColor: colors.input, borderColor: isSelected ? COLORS.primary : COLORS.borderColor2 },
        ]}
      >
        <View style={styles.imageContainer}>
          {card.image && (
            <Image 
              source={card.image} 
              style={styles.cardImage} 
            />
          )}
        </View>
        <View style={styles.cardDetails}>
          <Text style={[FONTS.h4, { color: colors.title, fontSize: 18 }]}>{card.title}</Text>
          <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 10 }]}>
            Daily Limit: {card.dailyLimit}
          </Text>
          <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
            Monthly Limit: {card.monthlyLimit}
          </Text>
          <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
            Topup Fee: {card.topupFees}
          </Text>
          <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
            Txn Fee: {card.transactionFees}
          </Text>
          <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
            FX Fee: {card.fxFees}
          </Text>
          <Text style={[FONTS.fontXs, { color: colors.text, marginTop: 4 }]}>
            Apple & Google Pay: {card.applePay && card.googlePay ? 'Yes' : 'No'}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkMarkContainer}>
            <Image
              source={IMAGES.checkMark}
              style={styles.checkMark}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pageBackground }}>
      <Header 
        title="Select Your Card" 
        leftIcon="back" 
        leftAction={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}>
        <View style={GlobalStyleSheet.container}>
          <View style={{ marginVertical: 10 }}>
            {cardOptions.map((card, index) => renderCard(card, index))}
          </View>
        </View>
      </ScrollView>
      {/* Pinned Bottom Section */}
      {selectedCardIndex !== null && (
        <View style={styles.paymentOptionsWrapper}>
          <Text style={[FONTS.h4, { color: colors.title, marginBottom: 10, textAlign: 'center', fontSize: 18 }]}>
            Selected Card Price: {cardOptions[selectedCardIndex].price}
          </Text>
          <TouchableOpacity
            style={[styles.fullWidthButton, { backgroundColor: COLORS.primary }]}
            onPress={() =>
              navigation.navigate('SelectCrypto', { chosenCard: cardOptions[selectedCardIndex] })
            }
          >
            <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
              Pay with Crypto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fullWidthButton, { backgroundColor: COLORS.primary, marginTop: 10 }]}
            onPress={() =>
              navigation.navigate('StripePaymentScreen', { chosenCard: cardOptions[selectedCardIndex] })
            }
          >
            <Text style={[FONTS.font, FONTS.fontSemiBold, { color: '#000' }]}>
              Pay with Card
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  imageContainer: {
    width: '55%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: SIZES.radius,
  },
  cardDetails: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  checkMarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 5,
  },
  checkMark: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },
  paymentOptionsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 15,
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
});

export default CardSelect;