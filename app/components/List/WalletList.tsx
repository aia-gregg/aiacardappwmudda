import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

type Props = {
    image : any;
    name : string;
    tag : string;
    price : string;
    key : number;
    change : string;
}

const WalletList = ({name, tag, price, change, image} : Props) => {

    const {colors} : {colors : any} = useTheme();

 // Convert the change string to a number for proper formatting.
 const numericChange = parseFloat(change);
 let formattedChange = "";
 // Determine the color and formatting based on numericChange
 let changeColor = COLORS.danger;
 if (numericChange > 0) {
     formattedChange = `+${numericChange.toFixed(2)}`;
     changeColor = COLORS.success;
 } else if (numericChange < 0) {
     formattedChange = numericChange.toFixed(2); // negative sign preserved
     changeColor = COLORS.danger;
 } else {
     // When exactly zero, show "+0.00" and use success color.
     formattedChange = `+0.00`;
     changeColor = COLORS.success;
 }

 return (
     <View 
         style={{
             flexDirection: 'row',
             alignItems: 'center',
             paddingVertical: 10,
         }}
     >
         <View
             style={{
                 height: 50,
                 width: 50,
                 borderRadius: SIZES.radius,
                 alignItems: 'center',
                 justifyContent: 'center',
                 backgroundColor: colors.card,
                 marginRight: 15,
             }}
         >
             <Image
                 style={{
                     height: 40,
                     width: 40,
                     resizeMode: 'contain',
                    //  tintColor: colors.title,
                     // Remove or comment out tintColor to use the original image colors:
                    // tintColor: colors.title,
                 }}
                 source={image}
             />
         </View>
         <View style={{ flex: 1 }}>
             <Text style={[FONTS.fontLg, FONTS.fontMedium, { color: colors.title, marginBottom: 6, lineHeight: 18 }]}>
                 {name}
             </Text>
             <Text style={[FONTS.fontSm, FONTS.fontBaseMedium, { color: colors.text, lineHeight: 18 }]}>
                 {tag}
             </Text>
         </View>
         <View style={{ alignItems: 'flex-end' }}>
             <Text style={[FONTS.h6, FONTS.fontBaseSemiBold, { color: colors.title, marginBottom: 2 }]}>
                 {price}
             </Text>
             <Text style={[FONTS.fontXs, FONTS.fontBaseMedium, { color: changeColor }]}>
                 {formattedChange}%
             </Text>
         </View>
     </View>
 );
};

export default WalletList;