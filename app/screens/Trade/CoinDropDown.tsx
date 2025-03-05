import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {Feather}  from '@expo/vector-icons';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CoinSheet from '../../components/BottomSheet/CoinSheet';

type Props = {
    colors: any;
}

const CoinDropDown = ({colors} : Props) => {

    const [modalShow , setModal] = useState<boolean>(false);
    const [coinData , setCoinData] = useState<any>({
        image : IMAGES.bitcoin,
        name : 'Bitcoin',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.2',
    });

    return (
        <View
            style={{
                marginHorizontal:-8,
                marginTop:-8,
            }}
        >
            <TouchableOpacity
                onPress={() => setModal(true)}
                activeOpacity={.8}
                style={{
                    borderRadius:SIZES.radius,
                    flexDirection:'row',
                    backgroundColor:colors.input,
                    borderWidth:1,
                    borderColor:colors.border,
                    alignItems:'center',
                    paddingHorizontal:12,
                    paddingVertical:8,
                }}
            >
                <View
                    style={{
                        height:40,
                        width:40,
                        borderRadius:20,
                        backgroundColor:colors.card,
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:10,
                    }}
                >
                    <Image
                        style={{
                            height:20,
                            width:20,
                            resizeMode:'contain',
                            tintColor:colors.title,
                        }}
                        source={IMAGES.bitcoin}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={[
                        FONTS.h6,FONTS.fontSemiBold,{
                            color:colors.title,
                            marginBottom:6,
                            marginTop:-2,
                        }
                    ]}>{coinData.name}</Text>
                    <Text style={[FONTS.fontXs,FONTS.fontBaseMedium,{color:colors.text}]}>{coinData.tag}</Text>
                </View>
                <View
                    style={{
                        marginRight:12,
                        alignItems:'flex-end',
                    }}
                >
                    <Text style={[
                        FONTS.h6,FONTS.fontBaseSemiBold,{
                            color:colors.title,
                        }
                    ]}>{coinData.balance}</Text>
                    <Text style={[
                        FONTS.fontXs,{
                            color:coinData.rate > 0 ? COLORS.success : COLORS.danger,
                        }
                    ]}>{coinData.rate}%</Text>
                </View>
                <Feather  size={22} color={colors.text} name='chevron-down'/>
            </TouchableOpacity>

            <CoinSheet
                modal={modalShow}
                setModal={setModal}
                setCoinData={setCoinData}
            />
        </View>
    )
}

export default CoinDropDown;