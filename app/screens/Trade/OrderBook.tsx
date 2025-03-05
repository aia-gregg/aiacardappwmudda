import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const OrderData = [
    {
        price : "0.6188",
        amount : "14.5k",
        length : '100%',
    },
    {
        price : "0.6109",
        amount : "8.009k",
        length : '75%',
    },
    {
        price : "0.68859",
        amount : "4.588k",
        length : '40%',
    },
    {
        price : "0.6188",
        amount : "14.5k",
        length : '50%',
    },
    {
        price : "0.6188",
        amount : "8.009k",
        length : '20%',
    },
    {
        price : "0.6188",
        amount : "4.588k",
        length : '45%',
    },
]

type Props = {
    colors : any;
}

const OrderBook = ({colors} : Props) => {
    return (
        <View style={{
            marginBottom:20,
        }}>
            <Text style={[FONTS.h6,{color:colors.title,marginBottom:10}]}>Order Book</Text>
            <View style={{flexDirection:'row',marginHorizontal:-5}}>
                <View style={{flex:1,paddingHorizontal:5}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                        <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Price</Text>
                        <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Amount</Text>
                    </View>
                    {OrderData.map((data:any,index) => (
                        <View
                            key={index}
                            style={{
                                height:22,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                            }}
                        >
                            <View
                                style={{
                                    width: data.length,
                                    backgroundColor:'rgba(115,255,152,.1)',
                                    height:'100%',
                                    position:'absolute',
                                }}
                            />
                            <Text style={{...FONTS.fontSm,fontSize:11,color:COLORS.success}}>{data.price}</Text>
                            <Text style={{...FONTS.fontSm,fontSize:11,color:colors.title}}>{data.amount}</Text>
                        </View>
                    ))}
                </View>
                <View style={{flex:1,paddingHorizontal:5}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                        <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Amount</Text>
                        <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Price</Text>
                    </View>
                    {OrderData.map((data:any,index) => (
                        <View
                            key={index}
                            style={{
                                height:22,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                            }}
                        >
                            <View
                                style={{
                                    right:0,
                                    width: data.length,
                                    backgroundColor:'rgba(198,32,62,.1)',
                                    height:'100%',
                                    position:'absolute',
                                }}
                            />
                            <Text style={{...FONTS.fontSm,fontSize:11,color:colors.title}}>{data.amount}</Text>
                            <Text style={{...FONTS.fontSm,fontSize:11,color:COLORS.danger}}>{data.price}</Text>
                        </View>
                    ))}
                </View>
            </View>   

            <View
                style={{
                    borderTopWidth:1,
                    borderColor:colors.border,
                    marginTop:10,
                    flexDirection:'row',
                    paddingTop:6,
                    paddingBottom:6,
                }}
            >
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{...FONTS.fontSm,...FONTS.fontBaseMedium,color:COLORS.success}}>0.6137</Text>
                    <Text style={{...FONTS.fontSm,...FONTS.fontBaseMedium,color:colors.text}}>  0.6137 USD</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',paddingLeft:10,justifyContent:'space-between'}}>
                    <Text style={{...FONTS.fontSm,...FONTS.fontBaseMedium,color:colors.text}}>0.000</Text>
                    <Text style={{...FONTS.fontSm,...FONTS.fontBaseMedium,color:colors.title}}>0.0000</Text>
                </View>
            </View>
        </View>
    )
}

export default OrderBook;