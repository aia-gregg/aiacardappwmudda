import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import HomeHeader from './HomeHeader';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Cards from './Cards';
import InfoCard from './InfoCard';
import TabStyle1 from '../../components/Tabs/TabStyle1';
import FeaturedCrypto from './FeaturedCrypto';
import { IMAGES } from '../../constants/Images';
import TopCrypto from './TopCrypto';

type HomeScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Home'>,
    StackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const {colors} : {colors : any} = useTheme()

    const [activeTab, setActiveTab] = useState<any>('Featured Crypto');

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <Image
                source={IMAGES.pattern2}
                style={GlobalStyleSheet.colorBg1}
            />
            <Image
                source={IMAGES.pattern3}
                style={GlobalStyleSheet.colorBg2}
            />
            
            <ScrollView contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}>
                <View style={GlobalStyleSheet.container}>
                    <View style={{ marginBottom: 30 }}>
                        <HomeHeader navigation={navigation} colors={colors} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[FONTS.font, { color: colors.text, marginBottom: 10 }]}>Total Balance</Text>
                            <Text style={[FONTS.h1, FONTS.fontBaseSemiBold, { color: colors.title, lineHeight: 40 }]}>
                                $1,000,000
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                marginBottom: 5,
                                paddingVertical: 2,
                                borderRadius: 20,
                                borderColor: COLORS.success,
                                borderWidth: 1,
                                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <Text style={[FONTS.fontSm, { color: COLORS.success }]}>+3.50%</Text>
                        </View>
                    </View>

                    {/* Wrap Cards and InfoCard in a container with reduced gap */}
                    <View style={styles.cardsInfoContainer}>
                        <Cards />
                        <InfoCard colors={colors} />
                    </View>
                    
                    <TabStyle1
                        tabMenu={['Featured Crypto','Other Crypto']}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                        colors={colors}
                    />

                    {activeTab === 'Featured Crypto' ?
                        <FeaturedCrypto />
                        :
                        activeTab === 'Other Crypto' ?
                        <TopCrypto />
                        :
                        <></>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  cardsInfoContainer: {
    marginTop: -10, // reduce gap between Cards and InfoCard
    marginBottom: 20,
  },
});

export default HomeScreen;