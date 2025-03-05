// DrawerMenu.tsx
import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { FONTS } from '../constants/theme';
import { AuthContext } from '../context/AuthContext';

const MenuItems = [
  {
    icon: IMAGES.home2,
    title: "Home",
    navigate: 'DrawerNavigation',
  },
  {
    icon: IMAGES.grid,
    title: "Component",
    navigate: 'Components',
  },
  {
    icon: IMAGES.grid,  // <-- Add or reuse any icon from your IMAGES
    title: "Select Card", 
    navigate: 'CardSelect', // must match the name you used in Stack.Screen
  },
  {
    icon: IMAGES.grid,  // <-- Add or reuse any icon from your IMAGES
    title: "Topup", 
    navigate: 'Topup', // must match the name you used in Stack.Screen
  },
  {
    icon: IMAGES.settings,
    title: "Settings",
    navigate: 'Settings',
  },
  {
    icon: IMAGES.history,
    title: "History",
    navigate: 'History',
  },
  {
    icon: IMAGES.logout,
    title: "Log Out",
    // For Log Out, we'll call our signOut function
  },
];

const DrawerMenu = ({ navigation }: { navigation: any }) => {
  const { colors } : { colors: any } = useTheme();
  // Retrieve signOut along with user data from AuthContext
  const { user, signOut } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        {/* Profile Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingBottom: 25,
            paddingTop: 10,
          }}
        >
          <Image
            source={IMAGES.profilePic}
            style={{
              height: 55,
              width: 55,
              borderRadius: 30,
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={[FONTS.font, FONTS.fontSemiBold, { color: colors.title, marginBottom: 8 }]}>
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </Text>
            <Text style={[FONTS.fontXs, { color: colors.text }]}>
              {user ? user.email : 'guest@example.com'}
            </Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={{ flex: 1, paddingVertical: 20 }}>
          {MenuItems.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (data.title === "Log Out") {
                  // Call the signOut function from AuthContext
                  signOut().then(() => navigation.navigate('Login'));
                } else if (data.navigate === "DrawerNavigation") {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate(data.navigate);
                }
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                marginBottom: 12,
              }}
            >
              <Image
                source={data.icon}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: colors.text,
                  marginRight: 14,
                }}
              />
              <Text style={[FONTS.font, FONTS.fontMedium, { color: colors.title, fontSize: 15 }]}>
                {data.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={{ paddingVertical: 10 }}>
          <Text style={[FONTS.font, FONTS.fontSemiBold, { color: colors.title, marginBottom: 8 }]}>
            {'\u00A9'} AIA Card
          </Text>
          <Text style={[FONTS.fontXs, { color: colors.text }]}>
            Version 1.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DrawerMenu;