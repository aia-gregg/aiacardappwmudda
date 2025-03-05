import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ThemeBtn from '../../components/ThemeBtn';

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

interface SettingItem {
  icon: any;
  title: string;
  type?: 'theme' | 'bioAuth';
  navigate?: keyof RootStackParamList;
  sheet?: string;
}

const menuData: SettingItem[] = [
  {
    icon: IMAGES.scan,
    title: 'Enable Face ID or Touch ID',
    type: 'bioAuth',
  },
  {
    icon: IMAGES.mail,
    title: 'Change Email Address',
    sheet: 'email',
  },
  {
    icon: IMAGES.phone,
    title: 'Change Phone Number',
    sheet: 'phone',
  },
  {
    icon: IMAGES.lock,
    title: 'Change Password',
    navigate: 'ChangePassword',
  },
  {
    icon: IMAGES.scan,
    title: 'Set Up Two Step Authentication',
    navigate: 'TwoStepAuthentication',
  },
];

const Settings = ({ navigation }: SettingsScreenProps) => {
  const { colors }: { colors: any } = useTheme();
  const [enableBioAuth, setEnableBioAuth] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Settings" leftIcon="back" />
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          {menuData.map((data: SettingItem, index: number) => {
            if (data.type === 'bioAuth') {
              return (
                <View
                  key={index}
                  style={{
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: SIZES.radius,
                      borderWidth: 1,
                      borderColor: colors.border,
                      backgroundColor: colors.input,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 15,
                    }}
                  >
                    <Image
                      source={data.icon}
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: colors.title,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      FONTS.h6,
                      FONTS.fontBaseMedium,
                      { color: colors.title, lineHeight: 18, flex: 1 },
                    ]}
                  >
                    {data.title}
                  </Text>
                  <Switch
                    trackColor={{ false: '#767577', true: "#efb900" }}
                    thumbColor={enableBioAuth ? '#000' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setEnableBioAuth(!enableBioAuth)}
                    value={enableBioAuth}
                  />
                </View>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (data.navigate) {
                      navigation.navigate(data.navigate as any);
                    } else if (data.sheet === 'email') {
                      navigation.navigate('ChangeEmailScreen');
                    } else if (data.sheet === 'phone') {
                      navigation.navigate('ChangePhoneScreen');
                    }
                  }}
                  style={{
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: SIZES.radius,
                      borderWidth: 1,
                      borderColor: colors.border,
                      backgroundColor: colors.input,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 15,
                    }}
                  >
                    <Image
                      source={data.icon}
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: colors.title,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      FONTS.h6,
                      FONTS.fontBaseMedium,
                      { color: colors.title, lineHeight: 18, flex: 1 },
                    ]}
                  >
                    {data.title}
                  </Text>
                  {data.type === 'theme' ? (
                    <ThemeBtn />
                  ) : (
                    <Feather name="chevron-right" size={20} color={colors.text} />
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;