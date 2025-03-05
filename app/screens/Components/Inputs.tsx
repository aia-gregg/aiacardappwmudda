import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
import {FontAwesome} from '@expo/vector-icons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Inputs = () => {

    const {colors}: {colors : any} = useTheme();


    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header 
                    title={'Inputs'}  
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>

                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Classic Input</Text>
                            </View>

                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        value={''}  
                                        type={'password'}
                                        placeholder="Enter Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Input with Icon</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.title}/> }
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.title}/>}
                                        value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        type={'password'}
                                        icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.title}/> }
                                        value={''}  
                                        placeholder="Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Input with different sizes</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputLg
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputSm
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        
                        <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Rounded Input</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputRounded
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputRounded
                                        icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                        value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        inputRounded
                                        type={'password'}
                                        icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                        value={''}  
                                        placeholder="Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                            <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Border Input</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                                        value={''}  
                                        placeholder="Enter Username"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/>}
                                        value={''}  
                                        placeholder="Enter Email"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Input
                                        type={'password'}
                                        icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                                        value={''}  
                                        placeholder="Password"
                                        onChangeText={(value)=> console.log(value)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Inputs;