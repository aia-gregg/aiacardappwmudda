import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import {Feather}  from '@expo/vector-icons';
import { FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';

type Props = {
    title : string,
    leftIcon ?: string,
    leftAction ?: any,
}

const Header = ({title, leftIcon, leftAction} : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const navigation = useNavigation();

    return (
        <View
            style={{
                shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 0,
                },
                shadowOpacity: theme.dark ? 0 : .1,
                shadowRadius: 5,
            }}
        >
            <View
                style={[GlobalStyleSheet.container,styles.header,{
                    padding:0,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#fff',
                }]}
                >
                {leftIcon === 'back' && 
                    <TouchableOpacity 
                    onPress={() => leftAction ? leftAction() : navigation.goBack()}
                    style={styles.actionBtn}
                    >
                        <Feather  size={24} color={colors.title} name='chevron-left'/>
                    </TouchableOpacity>
                }
                <Text style={[styles.title,{color:colors.title}]}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        height:50,
        backgroundColor:'rgba(255,255,255,.1)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    title : {
        fontSize:15,
        ...FONTS.fontBaseMedium,
    },
    actionBtn : {
        height: 45,
        width: 45,
        alignItems:'center',
        justifyContent : 'center',
        position:'absolute',
        left:0,
        top:0,
    }
})

export default Header;