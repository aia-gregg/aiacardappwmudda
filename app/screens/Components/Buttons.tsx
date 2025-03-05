import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import ButtonLight from '../../components/Button/ButtonLight';
import ButtonOutline from '../../components/Button/ButtonOutline';

const Buttons = () => {

    const {colors}: {colors : any} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.background,
                    }}
                >
                    <Header 
                        title={'Buttons'} 
                        leftIcon={'back'}
                    />
                    <ScrollView>
                        <View style={GlobalStyleSheet.container}>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Classic Button</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row,{paddingHorizontal:10}]}>
                                        <Button 
                                            title={'Primary'}
                                            style={{marginRight:8,marginBottom:8}}
                                            />  
                                        <Button 
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <Button 
                                            color={COLORS.danger}
                                            title={'Danger'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <Button 
                                            color={COLORS.success}
                                            title={'Success'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Button Light</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row,{paddingHorizontal:10}]}>
                                        <ButtonLight
                                            title={'Primary'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <ButtonLight 
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <ButtonLight 
                                            color={COLORS.danger}
                                            title={'Danger'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <ButtonLight 
                                            color={COLORS.success}
                                            title={'Success'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Button Outline</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row,{paddingHorizontal:10}]}>
                                        <ButtonOutline
                                            title={'Primary'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <ButtonOutline 
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <ButtonOutline 
                                            color={COLORS.danger}
                                            title={'Danger'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <ButtonOutline 
                                            color={COLORS.success}
                                            title={'Success'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Button Size</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row,{paddingHorizontal:10}]}>
                                        <Button 
                                            size={'sm'}
                                            title={'Small'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <Button 
                                            title={'Medium'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                        <Button 
                                            size={'lg'}
                                            title={'Large'}
                                            style={{marginRight:8,marginBottom:8}}
                                        />  
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Buttons;