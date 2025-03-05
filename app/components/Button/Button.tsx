import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

type Props = {
    title : string,
    onPress ?: (e : any) => void,
    color ?: any,
    style ?: object,
    size ?: any,
}

const Button = ({
    title,
    onPress,
    color,
    style,
    size,
}: Props) => {
    return (
        <TouchableOpacity 
            activeOpacity={.8}
            onPress={onPress}
        >
            <View
                style={[styles.button,color && {
                    backgroundColor:color,
                },size === 'sm' && {
                    height:40,
                },size === 'lg' && {
                    height:58,
                    paddingHorizontal:30,
                },style && {...style}]}
            >
                <Text style={[styles.buttnTitle,,size === 'sm' && {
                        fontSize:14,
                    },size === 'lg' && {
                        fontSize:18,
                    },color && {color : COLORS.white}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
        backgroundColor:COLORS.primary,
        height:48,
        borderRadius:SIZES.radius_sm,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
    },
    buttnTitle : {
        ...FONTS.fontLg,
        ...FONTS.fontSemiBold,
        color : '#000',
        lineHeight:16,
    }
});

export default Button;