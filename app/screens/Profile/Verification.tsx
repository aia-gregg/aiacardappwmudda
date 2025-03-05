import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Verification = () => {

    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex : 1,
                backgroundColor:colors.background,
            }}
        >
            <Header leftIcon='back' title='Verification'/>
            <ScrollView
                contentContainerStyle={{flexGrow:1}}
            >
                <View
                    style={[GlobalStyleSheet.container,{flex:1}]}
                >
                    <View style={{flex:1}}>
                        <View
                            style={{
                                flexDirection:'row',
                                backgroundColor:colors.input,
                                borderWidth:1,
                                borderColor:colors.border,
                                borderRadius:SIZES.radius,
                                paddingHorizontal:15,
                                paddingVertical:10,
                                alignItems:'center',
                                marginBottom:8,
                            }}
                        >
                            <View
                                style={{
                                    flex:1,
                                }}
                            >
                                <Text style={[FONTS.font,{color:colors.title,marginBottom:8}]}>Phone number</Text>
                                <Text style={[FONTS.fontXs,{color:colors.title,opacity:.3}]}>----------</Text>
                            </View>
                            <Text style={[FONTS.font,FONTS.fontBaseMedium,{color:COLORS.danger}]}>Not Verified</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                backgroundColor:colors.input,
                                borderWidth:1,
                                borderColor:colors.border,
                                borderRadius:SIZES.radius,
                                paddingHorizontal:15,
                                paddingVertical:10,
                                alignItems:'center',
                                marginBottom:8,
                            }}
                        >
                            <View
                                style={{
                                    flex:1,
                                }}
                            >
                                <Text style={[FONTS.font,{color:colors.title,marginBottom:8}]}>Email address</Text>
                                <Text style={[FONTS.fontXs,{color:colors.title,opacity:.6}]}>yatin@example.com</Text>
                            </View>
                            <Text style={[FONTS.font,FONTS.fontBaseMedium,{color:COLORS.success}]}>Verified</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            padding:15,
                        }}
                    >
                        <Button
                            onPress={() => {}}
                            title='Start Verification'
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Verification;