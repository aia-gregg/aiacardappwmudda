import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from './theme';

export const GlobalStyleSheet = StyleSheet.create({
    colorBg1 : {
        position:'absolute',
        top:'-40%',
        left:'-60%',
        height:'100%',
        width:'150%',
        resizeMode:'contain',
    },
    colorBg2 : {
        position:'absolute',
        bottom:'-55%',
        right:'-60%',
        height:'100%',
        width:'150%',
        resizeMode:'contain',
    },
    container : {
        paddingHorizontal: 15,
        paddingVertical: 15,
        maxWidth: SIZES.container,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    row : {
        flexDirection:'row',
        marginHorizontal:-8,
        flexWrap:'wrap',
    },
    col50 : {
        width : '50%',
        paddingHorizontal:8,
    },
    loginTitle : {
        ...FONTS.fontBaseSemiBold,
        fontSize: 25,
        textAlign:'center',
        marginBottom:12,
    },
    loginDesc : {
        ...FONTS.fontSm,
        textAlign:'center',
    },
    label : {
        ...FONTS.fontXs,
        marginBottom:5,
    },
    inputGroup : {
        marginBottom:20,
    },
    loginBtnArea : {
        paddingHorizontal:15,
        paddingVertical:10,
    },
    linkBtn : {
        ...FONTS.font,
        color : "#ffffff",
    },
    linkUnderLine : { 
        height:1,
        backgroundColor:COLORS.primary,
    },
    input : {
        ...FONTS.font,
        borderWidth:1,
        borderRadius:SIZES.radius_sm,
        height:48,
        paddingHorizontal:15,
    },
    listItem : {
        borderWidth : 1,
        marginBottom:8,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius:SIZES.radius,
        marginHorizontal:15,
        flexDirection:'row',
        alignItems:'center',
    },
    listItemTxt : {
        ...FONTS.font,
        ...FONTS.fontMedium,
        lineHeight:16,
        flex:1,
    },
    listIndicator : {
        height:18,
        width:18,
        borderWidth:1.5,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    card : {
        marginBottom:15,
        backgroundColor:COLORS.white,
        borderRadius:SIZES.radius,
    },
    cardHeader : {
        borderBottomWidth:1,
        borderBottomColor:COLORS.borderColor,
        paddingHorizontal:15,
        paddingVertical:15,
    },
    cardBody : {
        paddingHorizontal:15,
        paddingVertical:15,
    },
});