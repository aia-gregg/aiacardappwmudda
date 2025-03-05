import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    FlatList, 
    Animated, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {Feather}  from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import OnBoardingItem from './OnBoardingItem';
import NextBtn from './NextBtn';
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const data = [
    {
        id : 1,
        image : IMAGES.onBoarding1,
        title : "Control Your Payment Easy",
        desc  : "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    },
    {
        id : 2,
        image : IMAGES.onBoarding2,
        title : "Control Your Payment Easy",
        desc  : "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    },
    {
        id : 3,
        image : IMAGES.onBoarding3,
        title : "Control Your Payment Easy",
        desc  : "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    },
] 

type OnBoardingScreenProps = StackScreenProps<RootStackParamList, 'OnBoarding'>;

const OnBoarding = ({navigation} : OnBoardingScreenProps) => {  

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    const slidesRef = useRef<any>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
    
    const width = scrollX.interpolate({
        inputRange : [0 , 785],
        outputRange: [1, 1.4],
        extrapolate: 'clamp',
    });

    // const scrollTo = () => {
    //     if(currentIndex < data.length - 1){
    //         slidesRef.current.scrollToIndex({index : currentIndex + 1})
    //     }else{
    //         navigation.navigate('Login')
    //     }
    // }

    const scrollTo = () => {
        if (currentIndex < data.length - 1) {
            slidesRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        console.log(slidesRef.current); // Should not be null
    }, []);

    // const viewableItemChanged = useRef(({viewableItems}:{viewableItems:any}) => {
    //     setCurrentIndex(viewableItems[0].index);
    // }).current;

    const viewableItemChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0]?.index ?? 0);
        }
    }).current;

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                // overflow:'hidden',
                backgroundColor:colors.background,
            }]}
        >
            <Image
                source={IMAGES.pattern2}
                style={GlobalStyleSheet.colorBg1}
            />
            <Image
                source={IMAGES.pattern3}
                style={GlobalStyleSheet.colorBg2}
            />
            <Animated.View
                style={styles.circleBox}
            >
                <Animated.View
                    style={{
                        transform:[{scale:width}]
                    }}
                >
                    <Image
                        source={IMAGES.pattern1}
                        style={[styles.circlePattern,{tintColor:colors.title}]}
                    />
                </Animated.View>
            </Animated.View>
            <View
                style={{
                    alignItems:'flex-end',
                    paddingHorizontal:15,
                    paddingVertical:15,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <View
                        style={[styles.skipBtn,{backgroundColor:colors.input}]}
                    >
                        <Text style={[styles.skipBtnTxt,{color:colors.title}]}>Skip</Text>
                        <Feather  color={colors.title} size={16} name='chevron-right'/>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                ref={slidesRef}
                horizontal
                pagingEnabled
                initialNumToRender={data.length} // Render all items initially
                getItemLayout={(data, index) => ({
                    length: Dimensions.get('window').width, // Width of one item
                    offset: Dimensions.get('window').width * index,
                    index,
                })}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item:any) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={viewableItemChanged}
                renderItem={({item}) => {
                    return(
                        <OnBoardingItem
                            image={item.image}
                            title={item.title}
                            desc={item.desc}
                            colors={colors}
                        />
                    )
                }}
            />

            <View
                style={{
                    alignItems:'center',
                    padding:50,
                }}
            >
                <NextBtn 
                    scrollTo={scrollTo} 
                    percentage={(currentIndex + 1) * (100/data.length)}
                    theme={theme}
                />
            </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    circleBox:{
        top : '10%',
        position:'absolute',
        width:'100%',
        height:345,
    },
    circlePattern : {
        height:'100%',
        width:'100%',
        resizeMode:'contain',
    },
    skipBtn : {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,.1)',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:15,
    },
    skipBtnTxt : {
        ...FONTS.fontXs,
        color:COLORS.white,
        top:1,
        marginRight:4,
    }
})

export default OnBoarding