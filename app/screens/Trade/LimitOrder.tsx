import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input/Input';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

type Props = {
    colors : any;
}

const LimitOrder = ({colors} : Props) => {
    return (
        <View>
            <View style={GlobalStyleSheet.inputGroup}>
                <View
                    style={{
                        flexDirection:'row',
                    }}
                >
                    <Text style={[GlobalStyleSheet.label,{color:colors.title,flex:1}]}>Price</Text>
                    <Text style={[FONTS.fontSm,{color:colors.text,bottom:4}]}>BALANCE: <Text style={[FONTS.fontBaseSemiBold,{color:colors.title}]}>$3,123.9</Text></Text>
                </View>
                <View>
                    <Input
                        placeholder={'0.00'}
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
            <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Amount</Text>
                <View>
                    <Input
                        placeholder={'Amount'}
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
                            source={IMAGES.bitcoin2}
                        />
                        <Text style={[FONTS.fontSm,FONTS.fontMedium,{color:colors.title}]}>BTC</Text>
                    </View>
                </View>
            </View>
            <View style={GlobalStyleSheet.inputGroup}>
                <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Total</Text>
                <View>
                    <Input
                        placeholder={'Total'}
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

export default LimitOrder;