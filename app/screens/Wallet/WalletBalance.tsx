import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Feather}  from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryPie } from 'victory-native';

type Props = {
    navigation : any;
    bottomSheetRef : any;
    setSheetType : any;
}

const WalletBalance = ({navigation, bottomSheetRef, setSheetType} : Props) => {
    return (
        <LinearGradient
            start={{x: 5, y: 0.7}} end={{x: 0.5, y: 1.0}}
            locations={[0,1]}
            // colors={["#273121","#191D33"]}
            colors={["#efb900","#000"]}
            style={{
                borderBottomLeftRadius:25,
                borderBottomRightRadius:25,
                marginBottom:10,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:15,
                    paddingVertical:10,
                    zIndex:1,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('BottomTab',{screen : 'Home'})}
                    style={styles.leftBtn}
                >
                    <Feather  size={26} color={COLORS.white} name='chevron-left'/>
                </TouchableOpacity>
                <Text style={[FONTS.h5,{color:COLORS.white,top:-2,flex:1,textAlign:'center'}]}>Wallet</Text>
                <View
                    style={{
                        width:35
                    }}
                />
            </View>
            
            <View
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:200,
                }}
            >
                <View
                    style={{
                        position:'absolute',    
                        top:-35,
                        zIndex:0,
                    }}
                >
                    <VictoryPie
                        width={500}
                        height={395}
                        //cornerRadius={10}
                        innerRadius={132}
                        startAngle={90}
                        endAngle={-90}
                        padAngle={3}
                        labels={({datum}) => ``}
                        colorScale={['#FDFFA0', '#CAFFD8']}
                        data={[
                            {x: 'Spot', y: 10},
                            {x: 'Derivative', y: 20},
                        ]}
                    />
                </View>
                <View
                    style={{
                        alignItems:'center',
                        marginBottom:20,
                        marginTop:20,
                        paddingTop:30,
                    }}
                >
                    <Text style={[FONTS.font,FONTS.fontMedium,{color:COLORS.primary,marginBottom:8}]}>Total Balance</Text>
                    <Text style={[FONTS.h1,FONTS.fontBaseSemiBold,{color:COLORS.white,lineHeight:42,marginBottom:2}]}>$64,926</Text>
                    <Text style={[FONTS.fontSm,{color:COLORS.darkText}]}>BTC: 1,99992.01</Text>
                </View>
            </View>
            
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    paddingBottom:25,
                    paddingHorizontal:30,
                }}
            >
                <View style={styles.btnlink}>
                    <TouchableOpacity
                        onPress={() => {setSheetType('deposit');bottomSheetRef.current.snapToIndex(0)}}
                        style={{
                            alignItems:'center',
                        }}
                    >
                        <View
                            style={styles.iconBtn}
                        >
                            <Image
                                source={IMAGES.deposit}
                                style={styles.iconImg}
                            />
                        </View>
                        <Text
                            style={styles.btnTxt}
                        >Deposit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnlink}>
                    <TouchableOpacity
                        onPress={() => {setSheetType('withdraw');bottomSheetRef.current.snapToIndex(0)}}
                        style={{
                            alignItems:'center',
                        }}
                    >
                        <View
                            style={styles.iconBtn}
                        >
                            <Image
                                source={IMAGES.withdraw}
                                style={styles.iconImg}
                            />
                        </View>
                        <Text
                            style={styles.btnTxt}
                        >Withdraw</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnlink}>
                    <TouchableOpacity
                        onPress={() => {setSheetType('transfer');bottomSheetRef.current.snapToIndex(0)}}
                        style={{
                            alignItems:'center',
                        }}
                    >
                        <View
                            style={styles.iconBtn}
                        >
                            <Image
                                source={IMAGES.transfer}
                                style={styles.iconImg}
                            />
                        </View>
                        <Text
                            style={styles.btnTxt}
                        >Transfer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </LinearGradient>
    )
}

const styles =  StyleSheet.create({
    leftBtn : {
        height:35,
        width:35,
        borderRadius:35,
        backgroundColor:'rgba(255,255,255,.1)',
        alignItems:'center',
        justifyContent:'center',
    },
    iconBtn : {
        height:50,
        width:50,
        borderRadius:SIZES.radius,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,.08)',
        borderWidth:1,
        borderColor:'rgba(255,255,255,.15)',
        marginBottom:8,
    },
    iconImg : {
        height:24,
        width:24,
        resizeMode:'contain',
    },
    btnTxt : {
        ...FONTS.fontSm,
        ...FONTS.fontBaseMedium,
        color:COLORS.white,
        textTransform:'uppercase',
        letterSpacing:1.5,
    },
    btnlink : {
        flex:1,
        alignItems:'center',
    }
});

export default WalletBalance;