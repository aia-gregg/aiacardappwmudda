import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, SafeAreaView } from 'react-native';
import Route from './app/navigation/Route';
import { useFonts } from 'expo-font';
import { AuthProvider } from './app/context/AuthContext'; // Adjust path if needed
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const [loaded] = useFonts({
    PoppinsRegular: require('./app/assets/fonts/Poppins-Regular.ttf'),
    RalewayBold: require('./app/assets/fonts/Raleway-Bold.ttf'),
    RalewayMedium: require('./app/assets/fonts/Raleway-Medium.ttf'),
    RalewaySemiBold: require('./app/assets/fonts/Raleway-SemiBold.ttf'),
    PoppinsMedium: require('./app/assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./app/assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          // paddingTop: Platform.OS === 'web' ? 0 : 35,
        }}
      >
        <StripeProvider publishableKey="pk_test_51Qy1IkDO1xHmcck3Beyn02U0eH2GsMpYvSBEsLR8v44AX3kMPXyKqW9ezKUUyByjYjbpEqxwNd7rluNLvWRQCovi0056V8rLzD">
          <AuthProvider>
            <Route />
          </AuthProvider>
        </StripeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;