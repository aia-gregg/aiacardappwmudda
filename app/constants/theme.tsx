import { Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

export const COLORS = {
	primary : "#EFB900",
	secondary : "#000",
	success : "#43CD8B",
	danger  : "#E12344",
	warning : "#ffb02c",
	info : "#2B39B9",
	white   : "#fff",
	primaryText : "#5DB521",
	dark : "#2f2f2f",
	light : "#E6E6E6",
	grey : "#BDBDBD",
	dark2 : "#4A5157",
	dark3 : "#101010",
	// border : "#EFB900",
	
	//light theme
	card : "#fff",
	background : "#F5F5F5",
	text : "rgba(0,0,0,.6)",
	title : "#000",
	borderColor : "#4A5157",
	borderColor2 : "#4A5157",
	input : "rgba(0,0,0,.03)",
	
	//dark theme
	darkCard : "rgba(6, 6, 6, 0.05)",
	darkBackground : "#000303",
	darkText : "rgba(255,255,255,.6)",
	darkTitle : "#fff",
	darkBorder : "rgba(255,255,255,.1)",
	darkInput : "rgba(255,255,255,.05)",
}

export const SIZES = {
	fontLg:16,
    font:14,
	fontSm:13,
	fontXs:12,

	//radius
    radius:15,
    radius_sm:8,
	radius_lg:18,

	//space
	padding:15,
	margin:15,

	container : 800,

    //Font Sizes
    h1:34,
    h2:28,
    h3:24,
    h4:20,
    h5:18,
	h6:16,

    //App dimensions
    width,
    height,
	
};

export const FONTS = {
    font   : {fontSize:SIZES.font,color: COLORS.text, lineHeight:20, fontFamily:'PoppinsRegular'},
	fontSm : {fontSize:SIZES.fontSm,color: COLORS.text, lineHeight:20, fontFamily:'PoppinsRegular'},
	fontXs : {fontSize:SIZES.fontXs,color: COLORS.text, lineHeight:14, fontFamily:'PoppinsRegular'},
	fontLg : {fontSize:SIZES.fontLg,color: COLORS.text, lineHeight:24, fontFamily:'PoppinsRegular'},
    h1     : {fontSize:SIZES.h1, color:COLORS.title, fontFamily:'RalewayBold'},
    h2     : {fontSize:SIZES.h2, color:COLORS.title, fontFamily:'RalewayBold'},
    h3     : {fontSize:SIZES.h3, color:COLORS.title, fontFamily:'RalewayBold'},
    h4     : {fontSize:SIZES.h4, color:COLORS.title, fontFamily:'RalewayBold'},
    h5     : {fontSize:SIZES.h5, color:COLORS.title, fontFamily:'RalewayBold'},
    h6     : {fontSize:SIZES.h6, color:COLORS.title, fontFamily:'RalewayBold'},

	fontMedium : {fontFamily : 'RalewayMedium'},
	fontSemiBold : {fontFamily : 'RalewaySemiBold'},
	fontBaseMedium : {fontFamily : 'PoppinsMedium'},
	fontBaseSemiBold : {fontFamily : 'PoppinsSemiBold'},
}

const appTheme = {COLORS, SIZES, FONTS}

export default appTheme;