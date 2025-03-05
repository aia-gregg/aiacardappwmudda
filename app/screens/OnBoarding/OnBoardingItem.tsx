import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet 
} from 'react-native';
import { SIZES, FONTS } from '../../constants/theme';

type Props = {
    image: any;
    title: string;
    desc: string;
    colors : any;
};

const OnBoardingItem : React.FC<Props> = ({
    image,
    title,
    desc,
    colors
}) => {
    return (
        <View
            style={[styles.sliderContent,{width:SIZES.width > SIZES.container ? SIZES.container : SIZES.width}]}
        >
            <View
                style={{
                    marginBottom:'20%',
                    marginTop:'10%',
                }}
            >
                <Image
                    style={styles.sliderImg}
                    source={image}
                />
            </View>
            <Text style={[styles.sliderTitle,{color:colors.title}]}>{title}</Text>
            <Text style={[styles.sliderDesc,{
                    color:colors.text,
                }]}
            >{desc}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    sliderContent : {
        paddingHorizontal:35,
        width:SIZES.width,
        paddingVertical:50,
        alignItems:'center',
    },
    sliderImg : {
        width:220,
        height:220,
        resizeMode:'contain',
    },
    sliderTitle : {
        ...FONTS.h1,
        textAlign:'center',
        marginBottom:12
    },
    sliderDesc : {
        ...FONTS.fontSm,
        textAlign:'center',
    },
})

export default OnBoardingItem;