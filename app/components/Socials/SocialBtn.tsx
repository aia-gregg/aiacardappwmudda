import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
    color ?: string;
    rounded ?: any;
    icon ?: any;
    text ?: string;
}

const SocialBtn = ({color, rounded, icon, text } : Props) => {
    return (
        <TouchableOpacity
            style={[{
                backgroundColor:color ? color : COLORS.primary,
                paddingVertical:12,
                overflow:'hidden',
                paddingLeft:56,
                paddingRight:20,
            },rounded && {
                borderRadius:30,
            }]}
        >
            <View
                style={[{
                    width:44,
                    position:'absolute',
                    top:0,
                    bottom:0,
                    backgroundColor:'rgba(0,0,0,0.15)',
                    alignItems:'center',
                    justifyContent:'center',
                },rounded && {
                    borderRadius:30,
                }]}
            >
                {icon}
            </View>
            <Text style={{...FONTS.font,...FONTS.fontBaseSemiBold,color:COLORS.white}}>{text}</Text>
        </TouchableOpacity>
    );
};



export default SocialBtn;