import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  colors: any;
  navigation: any;
};

const HomeHeader = ({ colors, navigation }: Props) => {
  const { user, refreshUser } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    const fetchUser = async () => {
      await refreshUser(); // ✅ Ensures the latest user data is always loaded
      setLocalUser(user);
    };
    fetchUser();
  }, [user]);

  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.profilePic}
        source={localUser && localUser.photo ? { uri: localUser.photo } : IMAGES.profilePic}
      />
      <View style={{ flex: 1 }}>
        <Text style={[FONTS.font, FONTS.fontSemiBold, { color: colors.title, marginBottom: 6 }]}>
          {localUser ? `${localUser.firstName} ${localUser.lastName}` : 'Guest User'}
        </Text>
        <Text style={[FONTS.fontXs, { color: colors.text }]}>
          {localUser ? localUser.email : 'guest@example.com'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
        style={[styles.headerBtn, { backgroundColor: colors.border }]}
      >
        <Feather color={colors.title} size={22} name="bell" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={[styles.headerBtn, { backgroundColor: colors.border }]}
      >
        <Feather color={colors.title} size={22} name="grid" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerBtn: {
    height: 45,
    width: 45,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeHeader;