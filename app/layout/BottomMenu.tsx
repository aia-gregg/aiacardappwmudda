import React, {useEffect, useRef} from 'react';
import { 
    View, 
    Animated,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { SIZES, FONTS, COLORS } from '../constants/theme';
import { IMAGES } from '../constants/Images';

type Props = {
    state : any,
    navigation : any,
    descriptors : any
}

const BottomMenu = ({state, navigation, descriptors}: Props) => {

    const theme = useTheme();
    const {colors} : {colors : any} = theme;

    const tabWidth = SIZES.width;

    const circlePosition = useRef(
        new Animated.Value(
            tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5,
        ),
    ).current;
    
    const tabW =
        tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

    const onTabPress = (index:any) => {
        Animated.spring(circlePosition, {
          toValue: index * tabW,
          useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        //console.log(state.index);
        Animated.spring(circlePosition, {
            toValue: state.index * tabW,
            useNativeDriver: true,
        }).start();
    },[state.index]);


    return (
        <View style={{
            backgroundColor:theme.dark ? colors.background : colors.card,
            
        }}>
            
                <View
                    style={[styles.tabBar,
                    {
                        borderTopColor:colors.border,
                    }]}
                >
                    <View
                        style={[GlobalStyleSheet.container,{
                            flexDirection: 'row',
                            paddingHorizontal: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                        }]}
                    >

                        <Animated.View style={{transform: [{translateX: circlePosition}]}}>
                            <View
                                style={{
                                    width: tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
                                    position: 'absolute',
                                    //backgroundColor:'red',
                                    zIndex: 1,
                                    top: -24,
                                    left: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        height:65,
                                        width:65,
                                        borderRadius:40,
                                        backgroundColor:'rgba(255,255,255,.1)',
                                        position:'absolute',
                                    }}
                                />
                                <View
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:25,
                                        backgroundColor:COLORS.primary,
                                    }}
                                />
                            </View>
                        </Animated.View>

                        {state.routes.map((route:any , index:string) => {

                            const {options} = descriptors[route.key];
                            const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.name;

                            const isFocused = state.index === index;

                            const iconTranslateY = useRef(new Animated.Value(0)).current;
                            Animated.timing(iconTranslateY, {
                                toValue: isFocused ? -20 : 0,
                                duration: 200,
                                useNativeDriver: true,
                            }).start();

                            const onPress = () => {
                                const event = navigation.emit({
                                  type: 'tabPress',
                                  target: route.key,
                                  canPreventDefault: true,
                                });
                
                                if (!isFocused && !event.defaultPrevented) {
                                  navigation.navigate({name: route.name, merge: true});
                                  onTabPress(index);
                                }
                            };

                            return(
                                <View
                                    key={index}
                                    style={styles.tabItem}
                                >   
                                    <TouchableOpacity
                                        onPress={onPress}
                                        style={styles.tabLink}
                                    >
                                        <Animated.View
                                            style={{
                                                transform: [{translateY: iconTranslateY}],
                                        }}>
                                            <Image 
                                                style={{
                                                    height:24,
                                                    width:24,
                                                    marginBottom:4,
                                                    tintColor: isFocused ? COLORS.title : theme.dark ? colors.title : colors.text,
                                                }}
                                                source={
                                                    label === 'History'    ?  IMAGES.history:
                                                    label === 'Topup' ?  IMAGES.transfer:
                                                    label === 'Home'     ?  IMAGES.home:
                                                    label === 'Wallet'   ?  IMAGES.wallet:
                                                    label === 'Profile'  ?  IMAGES.profile : IMAGES.home
                                                }
                                            />
                                        </Animated.View>
                                        <Text style={[styles.navText,{color:isFocused ? colors.title : colors.text}]}>{label}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar : {
        height : 60,
        borderTopWidth:1,
    },
    tabItem : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },
    tabLink : {
        alignItems: 'center',
    },
    navText : {
        ...FONTS.fontXs,
        ...FONTS.fontMedium,
    }
});
 
export default BottomMenu;