import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, FONTS, COLORS } from '../../constants/theme';

const OrderData = [
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
    {
        type :"Buy",
        orderDate : "02-08-2022 5:30 pm",
        amount : "0.020000045",
        price : "294.70",
        orderType : "Limit order",
    },
]

type Props = {
    colors : any;
}

const OpenOrder = ({colors} : Props) => {
    return (
        <View>
            {OrderData.map((data,index) => {
                return(
                    <View
                        key={index}
                        style={{
                            backgroundColor:colors.card,
                            marginBottom:8,
                            borderRadius:SIZES.radius,
                            paddingHorizontal:15,
                            paddingVertical:12,
                        }}
                    >
                        <View
                            style={styles.listRow}
                        >
                            <Text style={[FONTS.h5,FONTS.fontBaseMedium,{color:COLORS.primary,flex:1}]}>{data.type}</Text>
                            <Text style={[FONTS.font,{color:COLORS.danger}]}>Cancel</Text>
                        </View>
                        <View
                            style={styles.listRow}
                        >
                            <Text style={[FONTS.font,FONTS.fontBaseMedium,{color:colors.title,flex:1}]}>Order Date</Text>
                            <Text style={[FONTS.fontXs,{color:colors.text}]}>{data.orderDate}</Text>
                        </View>
                        <View
                            style={styles.listRow}
                        >
                            <Text style={[styles.labelText,{color:colors.text}]}>Amount</Text>
                            <Text style={[styles.dataText,{color:colors.title}]}>{data.amount}</Text>
                        </View>
                        <View
                            style={styles.listRow}
                        >
                            <Text style={[styles.labelText,{color:colors.text}]}>Price</Text>
                            <Text style={[styles.dataText,{color:colors.title}]}>{data.price}</Text>
                        </View>
                        <View
                            style={styles.listRow}
                        >
                            <Text style={[styles.labelText,{color:colors.text}]}>Order type</Text>
                            <Text style={[styles.dataText,{color:colors.title}]}>{data.orderType}</Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    listRow : {
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:1,
    },
    labelText : {
        flex:1,
        ...FONTS.fontSm,
    },
    dataText : {
        ...FONTS.fontSm,
        ...FONTS.fontBaseMedium,
    },
});

export default OpenOrder;