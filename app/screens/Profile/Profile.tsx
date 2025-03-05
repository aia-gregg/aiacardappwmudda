import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { AuthContext } from '../../context/AuthContext';

const menuData = [
  {
    icon: IMAGES.verification,
    title: "KYC Verification",
    navigate: 'Verification',
  },
  {
    icon: IMAGES.referral,
    title: "Referral Dashboard",
    navigate: 'Referral',
  },
  {
    icon: IMAGES.settings,
    title: "Settings & Security",
    navigate: 'Settings',
  },
  {
    icon: IMAGES.support,
    title: "Get Support",
    navigate: 'Support',
  },
  {
    icon: IMAGES.language,
    title: "Default Language",
    type: 'language',
  },
  {
    icon: IMAGES.logout,
    title: "Log Out",
  },
];

type ProfileScreenProps = CompositeScreenProps<
  StackScreenProps<BottomTabParamList, 'Profile'>,
  StackScreenProps<RootStackParamList>
>;

const HEADER_HEIGHT = 65; // Adjust according to your Header's actual height

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { colors } : { colors: any } = useTheme();
  const { user, signOut } = useContext(AuthContext);
  
  // Static language value
  const staticLanguage = "English";

  // Dummy photo upload handler
  const handlePhotoUpload = () => {
    console.log("Photo upload pressed");
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Pinned Header with solid fill */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, backgroundColor: "#000" }}>
        <Header
          title='Profile'
          leftIcon='back'
          leftAction={() => navigation.navigate('Home')}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 75 }}>
        {/* Top Section */}
        <View style={topSectionStyles.container}>
          <TouchableOpacity onPress={handlePhotoUpload}>
            <View style={topSectionStyles.profileImageContainer}>
              <Image
                source={user && (user as any).photo ? { uri: (user as any).photo } : IMAGES.profilePic}
                style={topSectionStyles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <View style={topSectionStyles.infoContainer}>
            <Text style={topSectionStyles.nameText}>
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </Text>
            <Text style={topSectionStyles.emailText}>
              {user ? user.email : 'guest@example.com'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={topSectionStyles.editButton}
          >
            <Image
              source={IMAGES.edit}
              style={topSectionStyles.editImage}
            />
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <View style={{ paddingHorizontal: 10 }}>
          {menuData.map((data: any, index: number) => (
            <React.Fragment key={index}>
              {data.title === "Default Language" ? (
                <View style={menuItemStyles.row}>
                  <View style={menuItemStyles.iconContainer}>
                    <Image
                      source={data.icon}
                      style={menuItemStyles.icon}
                    />
                  </View>
                  <Text style={menuItemStyles.title}>{data.title}</Text>
                  <Text style={menuItemStyles.value}>{staticLanguage}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (data.title === "Log Out") {
                      handleLogout();
                    } else if (data.navigate) {
                      navigation.navigate(data.navigate);
                    }
                  }}
                  style={menuItemStyles.row}
                >
                  <View style={menuItemStyles.iconContainer}>
                    <Image
                      source={data.icon}
                      style={menuItemStyles.icon}
                    />
                  </View>
                  <Text style={menuItemStyles.title}>{data.title}</Text>
                  <Feather name='chevron-right' size={20} color={colors.text} />
                </TouchableOpacity>
              )}

              {/* App Version Row */}
              {data.title === "Default Language" && (
                <View style={menuItemStyles.row}>
                  <View style={menuItemStyles.iconContainer}>
                    <Feather name='info' size={18} color={colors.title} />
                  </View>
                  <Text style={menuItemStyles.title}>App Version</Text>
                  <Text style={menuItemStyles.value}>1.0.0</Text>
                </View>
              )}
              
              {/* Copyright below Log Out */}
              {data.title === "Log Out" && (
                <View style={{ marginLeft: 5, marginTop: 35, marginBottom: 8 }}>
                  <Text style={{ fontSize: 13, color: "#BDBDBD" }}>
                    Copyright © 2025 AI Analysis LLC. All rights reserved.
                  </Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const topSectionStyles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderRadius: 25,
    // borderBottomRightRadius: 25,
    marginBottom: 30,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20, // Fixed: removed leading zero
    paddingBottom: 20,
    borderColor: "#303030",
    borderWidth: 1,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderRadius: 65,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  profileImage: {
    height: 65,
    width: 65,
    borderRadius: 65,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: "#fff",
    marginBottom: 10,
  },
  emailText: {
    fontSize: 12,
    color: "#ccc",
  },
  editButton: {
    height: 45,
    width: 45,
    borderRadius: 45,
    backgroundColor: "#333",
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});

const menuItemStyles = StyleSheet.create({
  row: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#303030",
    backgroundColor: "#070707",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    height: 18,
    width: 18,
    tintColor: "#fff",
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: "#fff",
    marginRight: 5,
  },
});

export default ProfileScreen;