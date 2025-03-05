import React, { useRef, useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Dimensions 
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTheme } from '@react-navigation/native';
import Feather from "react-native-vector-icons/Feather";
import LoginSheet from '../../components/BottomSheet/LoginSheet';
import RegisterSheet from '../../components/BottomSheet/RegisterSheet';
import SuccessSheet from '../../components/BottomSheet/SuccessSheet';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';

const windowHeight = Dimensions.get("window").height;
const RBSheetAny = RBSheet as any;

const BottomSheetComponent = () => {
  const { colors } : { colors: any } = useTheme();
  const refRBSheet = useRef<any>(null);
  const [activeSheet, setActiveSheet] = useState<string>('');

  const ActionData = [
    {
      icon: "check-circle",
      title: "Success Sheet",
      sheet: 'success',
    },
    {
      icon: "log-out",
      title: "Login Sheet",
      sheet: 'login',
    },
    {
      icon: "file-text",
      title: "Register Sheet",
      sheet: 'register',
    },
  ];

  return (
    <>
      <RBSheetAny
        ref={refRBSheet}
        closeOnDragDown={true}
        height={
          activeSheet === "success" ? windowHeight * 0.6 :
          activeSheet === "login" ? windowHeight * 0.8 :
          activeSheet === "register" ? windowHeight * 0.85 :
          windowHeight * 0.55
        }
        openDuration={100}
        customStyles={{
          container: {
            backgroundColor: colors.cardBg,
          },
          draggableIcon: {
            marginTop: 10,
            marginBottom: 0,
            height: 5,
            width: 80,
            backgroundColor: colors.border,
          }
        }}
      >
        {activeSheet === "success" ? (
          <SuccessSheet />
        ) : activeSheet === "login" ? (
          <LoginSheet sheetRef={refRBSheet} />
        ) : activeSheet === "register" ? (
          <RegisterSheet sheetRef={refRBSheet} />
        ) : (
          <SuccessSheet />
        )}
      </RBSheetAny>

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
          <Header 
            title="Bottom Sheets"
            leftIcon="back"
          />
          <ScrollView>
            <View style={GlobalStyleSheet.container}>
              <View style={[GlobalStyleSheet.card, { backgroundColor: colors.card }]}>
                <View style={GlobalStyleSheet.cardBody}>
                  {ActionData.map((data, index) => {
                    return (
                      <Ripple
                        onPress={() => { 
                          setActiveSheet(data.sheet);
                          refRBSheet.current.open();
                        }}
                        key={index}
                        style={[
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 0,
                            paddingVertical: 12,
                            borderBottomWidth: 1,
                            borderColor: colors.border,
                          },
                          index === ActionData.length - 1 && { borderBottomWidth: 0 }
                        ]}
                      >
                        <View
                          style={{
                            height: 30,
                            width: 30,
                            backgroundColor: COLORS.primary,
                            borderRadius: 30,
                            marginRight: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Feather size={16} color={COLORS.title} name={data.icon} />
                        </View>
                        <Text style={{ ...FONTS.font, ...FONTS.fontMedium, flex: 1, color: colors.title }}>
                          {data.title}
                        </Text>
                        <Feather color={colors.text} name={'chevron-right'} size={22} />
                      </Ripple>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BottomSheetComponent;