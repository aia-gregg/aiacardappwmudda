import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../Button/Button';

type Props = {
    close : any;
}

const OptionModal = ({close} : Props) => {

    const {colors}: {colors : any} = useTheme();

    return (
        <>
            <View style={{
                alignItems:'center',
                paddingHorizontal:30,
                paddingVertical:30,
                paddingBottom:30,
                backgroundColor:colors.cardBg,
                borderRadius:SIZES.radius,
                marginHorizontal:30,
                maxWidth:340,
            }}>
                <Ionicons name='information-circle-sharp' style={{marginBottom:8}} color={COLORS.primary} size={60}/>
                <Text style={{...FONTS.h5,color:colors.title,marginBottom:5}}>Are You Confirm?</Text>
                <Text style={{...FONTS.font,color:colors.text,textAlign:'center'}}>You want to cancel the order of T-shirt.</Text>
                <View style={{flexDirection:'row',marginTop:25}}>
                    <Button 
                        onPress={() => close(false)}
                        color={COLORS.danger} 
                        style={{marginRight:10}}
                        title="Cancel"/>
                    <Button 
                        onPress={() => close(false)}
                        title="Confirm"/>
                </View>
            </View>
        </>
    );
};


export default OptionModal;