import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { FlatList } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { Image } from 'react-native';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const notificationData = [
    {
        id:'1',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'2',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'5 Hours',
    },
    {
        id:'3',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'4',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'5',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'6',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'7',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'8',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'9',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'10',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
]


const Notifications = () => {
    
    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Notification'
                leftIcon='back'
            />
            <View style={[GlobalStyleSheet.container,{padding:0, flex:1}]}>
                <FlatList
                    data={notificationData}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                padding:15,
                                borderBottomWidth:1,
                                borderColor:colors.border,
                            }}
                        >
                            <View
                                style={{
                                    height:42,
                                    width:42,
                                    borderRadius:SIZES.radius,
                                    backgroundColor:COLORS.primary,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginRight:10,
                                }}
                            >
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        tintColor:COLORS.title,
                                        resizeMode:'contain',
                                    }}
                                    source={IMAGES.mail}
                                />
                            </View>
                            <View
                                style={{
                                    flex:1,
                                }}
                            >
                                <Text 
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={{
                                        ...FONTS.font,
                                        ...FONTS.fontMedium,
                                        color:colors.title,
                                        marginBottom:6
                                    }}
                                >{item.title}</Text>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={{
                                        ...FONTS.fontXs,
                                        color:colors.text,
                                    }}
                                >{item.desc}</Text>
                            </View>
                            <View style={{alignSelf:'flex-end',width:60,alignItems:'flex-end'}}>
                                <Text style={{...FONTS.fontSm,color:COLORS.primaryText}}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView> 
    )
}

export default Notifications;