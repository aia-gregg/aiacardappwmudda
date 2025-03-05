import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type WalletCardNavigationProp = StackNavigationProp<RootStackParamList, 'CardSelect'>;

type Props = {
  color?: string;
};

const WalletCard = ({ color }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation<WalletCardNavigationProp>();
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    navigation.navigate('CardSelect');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
      style={[
        styles.cardContainer,
        {
          backgroundColor: colors.card,
          borderColor: isPressed ? '#efb900' : 'rgba(255,255,255,0.25)',
        },
      ]}
    >
      {/* Background Pattern */}
      <Image
        source={IMAGES.pattern2}
        style={[
          styles.backgroundImage,
          { tintColor: color ? color : COLORS.primary },
        ]}
      />
      {/* Title */}
      <Text style={[FONTS.fontLg, FONTS.fontBaseSemiBold, styles.cardTitle]}>
        Buy New Card
      </Text>
      {/* Replace Chart and Dot Sections with Card Image
      <View style={styles.cardImageContainer}>
        <Image
          source={IMAGES.elitecard} // Use elite.png from your IMAGES object
          style={styles.cardImage}
        /> */}
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    overflow: 'hidden',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: -120,
    left: -100,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: 120,   // Adjust the size as desired
    height: 80,   // Adjust the size as desired
    resizeMode: 'contain',
  },
});

export default WalletCard;