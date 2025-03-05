import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import { IMAGES } from '../../constants/Images';

const TwoStepAuthentication = () => {

    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Authentication'
                leftIcon='back'
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View
                    style={[GlobalStyleSheet.container,{flex:1}]}
                >
                    <View style={{flex:1}}>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                borderRadius:SIZES.radius,
                                paddingVertical:25,
                                paddingHorizontal:30,
                                alignItems:'center',
                                marginBottom:20,
                            }}
                        >
                            <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title}]}>Scan the qr</Text>
                            <View
                                style={{
                                    height:225,
                                    width : 225,
                                    borderRadius:SIZES.radius_sm,
                                    backgroundColor:COLORS.white,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginTop:20,
                                    marginBottom:20,
                                }}
                            >
                                <Image
                                    source={IMAGES.qrcode}
                                    style={{
                                        height:180,
                                        width:180,
                                        resizeMode:'contain',
                                    }}
                                />
                            </View>
                            <Text
                                style={[FONTS.fontXs,{color:colors.text,textAlign:'center',lineHeight:20}]}
                            >Please scan the qr code or copy the genrated address to Authenticate.</Text>
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Input
                                value='4dt45r44r81w8e48f18e1f41e1'
                            />
                            <TouchableOpacity
                                style={{
                                    height:45,
                                    width:45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    position:'absolute',
                                    right:0,
                                    top:0,
                                }}
                            >
                                <Image
                                    style={{
                                        height:18,
                                        width:18,
                                        resizeMode:'contain',
                                    }}
                                    source={IMAGES.copy}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Enter 6 digit 2fa code</Text>
                            {/* <OTPInputView
                                pinCount={6} 
                                style={{
                                    height:48,
                                    marginTop:4,
                                }}
                                codeInputFieldStyle={{
                                    ...FONTS.font,
                                    color:colors.title,
                                    fontSize:16,
                                    borderWidth:1,
                                    borderRadius:SIZES.radius_sm,
                                    borderColor:colors.border,
                                    flex:1,
                                    width:((SIZES.width - 30) / 6) - 8,
                                    backgroundColor:colors.input,
                                }}
                            /> */}
                        </View>
                    </View>
                    <View style={{padding:15}}>
                        <Button
                            onPress={() => {}}
                            title={'Enable'}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>   
    )
}

export default TwoStepAuthentication;