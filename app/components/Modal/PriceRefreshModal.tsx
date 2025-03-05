import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Feather}  from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const PriceRefreshModal = () => {

    const {colors}: {colors : any} = useTheme();

    return (
        <>
            <View style={{
                alignItems:'center',
                paddingHorizontal:30,
                paddingVertical:20,
                paddingBottom:30,
                backgroundColor:colors.cardBg,
                borderRadius:SIZES.radius,
                marginHorizontal:30,
                width:320,
            }}>
                <View
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        marginBottom:15,
                        marginTop:10,
                    }}
                >
                    <View
                        style={{
                            height:80,
                            width:80,
                            opacity:.2,
                            backgroundColor:COLORS.success,
                            borderRadius:80,
                        }}
                    />
                    <View
                        style={{
                            height:65,
                            width:65,
                            backgroundColor:COLORS.success,
                            borderRadius:65,
                            position:'absolute',
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Feather  size={32} color={COLORS.white} name="check"/>
                    </View>
                </View>
                <Text style={{...FONTS.h5,color:colors.title,textAlign:'center', marginBottom:10}}>Token Price Expired!</Text>
                <Text style={{...FONTS.font,color:colors.text,textAlign:'center'}}>Please refresh to get new conversion rate</Text>
                {/* "Refresh" Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // TODO: add your refresh logic here
        }}
        style={{
          marginTop: 20,
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.radius,
          paddingVertical: 10,
          paddingHorizontal: 25,
        }}
      >
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontSemiBold,
            color: '#000',
          }}
        >
          Refresh
        </Text>
      </TouchableOpacity>
            </View>
        </>
    );
};


export default PriceRefreshModal;