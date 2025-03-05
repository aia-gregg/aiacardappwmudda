import React, {useState} from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CoinDropDown from './CoinDropDown';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import TabStyle1 from '../../components/Tabs/TabStyle1';
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import Button from '../../components/Button/Button';
import OrderTabs from './OrderTabs';
import OrderBook from './OrderBook';

type TradeScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Trade'>,
    StackScreenProps<RootStackParamList>
>;

const TradeScreen = ({navigation} : TradeScreenProps) => {
    
    const {colors} : {colors : any} = useTheme();

    const [activeTab , setActiveTab] = useState<string>('buy');
    const [activeTab2 , setActive2Tab] = useState<string>('Limit');


    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
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
            <Header
                title='Trade'
                leftIcon='back'
                leftAction={() => navigation.navigate('Home')}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <CoinDropDown colors={colors}/>

                    <View
                        style={[styles.tabRow,{
                            backgroundColor:colors.card,
                        }]}
                    >
                        <TouchableOpacity
                            onPress={() => setActiveTab('buy')}
                            style={[styles.tabBtn,{
                                borderColor:colors.border,
                            },activeTab === 'buy' && {
                                backgroundColor: COLORS.primary,
                            }]}
                        >
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,lineHeight:18},activeTab === 'buy' && {color:COLORS.title}]}>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('sell')}
                            style={[styles.tabBtn,{
                                borderColor:colors.border,
                            },activeTab === 'sell' && {
                                backgroundColor: COLORS.danger,
                            }]}
                        >
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,lineHeight:18},activeTab === 'sell' && {color:COLORS.white}]}>Sell</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:15}}>
                        <TabStyle1 
                            size={'sm'}
                            color={'#fff'}
                            tabMenu={['Market','Limit']}
                            setActiveTab={setActive2Tab}
                            activeTab={activeTab2}
                            activeIndex={1}
                            colors={colors}
                        />
                    </View>

                    
                    {activeTab2 === 'Limit' ?
                        <LimitOrder
                            colors={colors}
                        />
                        :
                    activeTab2 === 'Market' ?
                        <MarketOrder
                            colors={colors}
                        />
                        :
                        <></>
                    }

                    <View style={{
                        paddingHorizontal:15,
                        marginBottom:25,
                    }}>
                        {activeTab === "buy" ?
                            <Button
                                onPress={() => {}}
                                title='Buy BTC'
                            />
                            :
                        activeTab === "sell" ?
                            <Button
                                onPress={() => {}}
                                color={COLORS.danger}
                                title='Sell BTC'
                            />
                            :
                            <></>
                        }
                    </View>
                    
                    <OrderBook colors={colors}/>

                    <OrderTabs
                        colors={colors}
                    />
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabRow : {
        flexDirection:'row',
        marginHorizontal:-15,
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop:10,
        marginBottom:10,
    },
    tabBtn : {
        height:45,
        flex:1,
        borderWidth:1,
        borderRadius:SIZES.radius_sm,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:5,
    }
});

export default TradeScreen;