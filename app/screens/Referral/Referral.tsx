import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import Input from '../../components/Input/Input';

const tableData = [
  { num: '#1', split: '8%', referrals: '3', amount: '(0.01 BTC)' },
  { num: '#2', split: '6%', referrals: '13', amount: '(0.03 BTC)' },
  { num: '#3', split: '3%', referrals: '25', amount: '(0.02 BTC)' },
  { num: '#4', split: '2%', referrals: '37', amount: '(0.05 BTC)' },
  { num: '#5', split: '1%', referrals: '59', amount: '(0.04 BTC)' },
];

type ReferralScreenProps = StackScreenProps<{ Referral: undefined }, 'Referral'>;

const ReferralScreen = ({ navigation }: ReferralScreenProps) => {
  const { colors }: { colors: any } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Referral"
        leftIcon="back"
        leftAction={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={GlobalStyleSheet.container}>
          {/* Referral Section (Exact snippet) */}
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
            {/* <TouchableOpacity
              style={styles.referralDashboardButton}
              onPress={() => navigation.navigate('Referral')}
            >
              <Text style={[FONTS.fontBaseMedium, { color: '#000', textAlign: 'center' }]}>
                View Referral Dashboard
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Social Media Icons Row */}
          <View style={styles.socialIconsRow}>
            {[
              IMAGES.whatsapp,
              IMAGES.whatsapp,
              IMAGES.instagram,
              IMAGES.whatsapp,
              IMAGES.whatsapp,
            ].map((icon, index) => (
              <TouchableOpacity key={index} style={styles.socialIcon}>
                <Image style={styles.socialIconImage} source={icon} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Infocards Section */}
          <View style={{ ...GlobalStyleSheet.row, marginBottom: 35 }}>
            <View style={{ ...GlobalStyleSheet.col50 }}>
              <View
                style={{
                  borderRadius: SIZES.radius,
                  padding: 20,
                  backgroundColor: colors.card,
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'contain',
                      tintColor: COLORS.title,
                    }}
                    source={IMAGES.referral}
                  />
                </View>
                <Text style={{ ...FONTS.font, color: colors.title }}>Your Community</Text>
                <Text style={{ ...FONTS.h2, color: COLORS.primary, lineHeight: 37, marginBottom: 4 }}>
                  99
                </Text>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>Referrals</Text>
              </View>
            </View>
            <View style={{ ...GlobalStyleSheet.col50 }}>
              <View
                style={{
                  borderRadius: SIZES.radius,
                  padding: 20,
                  backgroundColor: colors.card,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      style={{
                        height: 22,
                        width: 22,
                        resizeMode: 'contain',
                        tintColor: COLORS.title,
                      }}
                      source={IMAGES.dollor}
                    />
                  </View>
                </View>
                <Text style={{ ...FONTS.font, color: colors.title }}>Lifetime Reward</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ ...FONTS.h5, ...FONTS.fontMedium, lineHeight: 37, color: colors.title }}>
                    75.33
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{
                      height: 16,
                      width: 16,
                      borderRadius: 16,
                      resizeMode: 'contain',
                      marginRight: 5,
                      tintColor: colors.title,
                    }}
                    source={IMAGES.btc}
                  />
                  <Text style={{ ...FONTS.fontSm, color: colors.text }}>0.015 BTC</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  referralSection: {
    backgroundColor: '#181818', // same as your snippet
    borderRadius: SIZES.radius,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  referralHeader: {
    ...FONTS.fontMedium,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 22,
    textAlign: 'left',
  },
  referralInputContainer: {
    marginBottom: 15,
  },
  referralLabel: {
    ...FONTS.fontXs,
    color: "#BDBDBD",
    marginBottom: 6,
  },
  referralInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 48,
  },
  referralInput: {
    flex: 1,
    ...FONTS.font,
    color: COLORS.white,
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
    tintColor: COLORS.white,
    resizeMode: 'contain',
//   },
//   referralDashboardButton: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 13,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: 10,
  },
  socialIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  socialIcon: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  socialIconImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default ReferralScreen;