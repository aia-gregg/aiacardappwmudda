import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Select from '../../components/Input/Select';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';


const selectData = [
    {
        id : "1",
        title : 'Topups/Recharge'
    },
    {
        id : "2",
        title : 'Fees & Charges'
    },
    {
        id : "3",
        title : 'Replacement Card'
    },
    {
        id : "4",
        title : 'Lost/Stolen Card'
    },
    {
        id : "5",
        title : 'Refunds'
    },
    {
        id : "6",
        title : 'Technical Issues'
    },
    {
        id : "7",
        title : 'KYC Verification'
    },
    {
        id : "8",
        title : 'Other Issues'
    },
]

const Support = () => {

    const {colors} : {colors : any} = useTheme();

    const [ticketFor , setTicket] = useState<any>('');

    const bottomSheetRef = useRef<any>(null);
    const snapPoints = useMemo(() => ['60%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props:any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
    );

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Support'
                leftIcon='back'
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[GlobalStyleSheet.container,{flex:1}]}>
                    <View style={{flex:1}}>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Ticket for</Text>
                            <Select
                                sheet={bottomSheetRef}
                                value={ticketFor}
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Message</Text>
                            <Input
                                placeholder='Enter your message'
                                numberOfLines={7}
                                multiline={true}
                                style={{
                                    minHeight:120,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{padding:15}}>
                        <Button
                            onPress={() => {}}
                            title={'Create Ticket'}
                        />
                    </View>
                </View>

            </ScrollView>
            <BottomSheet
                enablePanDownToClose={true}
                ref={bottomSheetRef}
                backdropComponent={renderBackdrop}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor:colors.cardBg,
                    borderTopLeftRadius:25,
                    borderTopRightRadius:25,
                }}
                handleIndicatorStyle={{
                    backgroundColor:colors.border,
                    width:100,
                    height:6,
                }}
            >
                <BottomSheetScrollView
                    contentContainerStyle={[GlobalStyleSheet.container,{
                        padding:0,
                        paddingBottom:20,
                    }]}
                >
                    {selectData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => {setTicket(data.title);bottomSheetRef.current.close()}}
                                style={[GlobalStyleSheet.listItem,{
                                    backgroundColor:colors.input,
                                    borderColor:colors.border,
                                },ticketFor === data.title && {
                                    backgroundColor:COLORS.primary,
                                }]}
                            >
                                <Text style={
                                    [GlobalStyleSheet.listItemTxt,
                                    {
                                        color:colors.title,
                                    },
                                    data.title === ticketFor && {
                                        ...FONTS.fontSemiBold,
                                        color: COLORS.title,
                                    }
                                ]}>{data.title}</Text>
                                <View
                                    style={[GlobalStyleSheet.listIndicator,{
                                        borderColor:colors.border,
                                    },ticketFor === data.title && {
                                        borderColor:COLORS.title,
                                        opacity : .8,
                                    }]}
                                >
                                    {ticketFor === data.title &&
                                        <View
                                            style={{
                                                height:10,
                                                width:10,
                                                borderRadius:10,
                                                backgroundColor:COLORS.title,
                                            }}
                                        />
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    )
}

export default Support;