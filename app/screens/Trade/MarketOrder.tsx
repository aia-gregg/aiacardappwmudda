import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input/Input';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

type Props = {
    colors : any;
}

const MarketOrder = ({colors} : Props) => {
    return (
        <View>
            <View style={GlobalStyleSheet.inputGroup}>
                <View
                    style={{
                        flexDirection:'row',
                    }}
                >
                    <Text style={[GlobalStyleSheet.label,{color:colors.title,flex:1}]}>Order Value</Text>
                    <Text style={[FONTS.fontSm,{color:colors.text,bottom:4}]}>BALANCE: <Text style={[FONTS.fontBaseSemiBold,{color:colors.title}]}>$3,123.9</Text></Text>
                </View>
                <View>
                    <Input
                        placeholder={'Order Value'}
                    />
                    <View
                        style={styles.coinTag}
                    >
                        <Image
                            style={{
                                height:16,
                                width:16,
                                resizeMode:'contain',
                                marginRight:4,
                            }}
                            source={IMAGES.usdt}
                        />
                        <Text style={[FONTS.fontSm,FONTS.fontMedium,{color:colors.title}]}>USDT</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    coinTag : {
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        right:15,
        top:12,
    }
});

export default MarketOrder;