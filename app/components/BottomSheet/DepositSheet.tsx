import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS } from '../../constants/theme';
import Select from '../Input/Select';
import { useTheme } from '@react-navigation/native';
import CoinSheet from './CoinSheet';
import Input from '../Input/Input';
import Button from '../Button/Button';

const windowHeight = Dimensions.get("window").height;

const DepositSheet = () => {
  const { colors }: { colors: any } = useTheme();
  const [coinData, setCoinData] = useState<any>('');
  const [modalShow, setModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [minHeight, setMinHeight] = useState<number>(windowHeight * 0.75);

  useEffect(() => {
    const onKeyboardShow = () => setMinHeight(windowHeight);
    const onKeyboardHide = () => setMinHeight(windowHeight * 0.75);

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            GlobalStyleSheet.container,
            styles.sheetContainer,
            { minHeight: minHeight },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[FONTS.h5, { color: colors.title, marginBottom: 18 }]}>
            Deposit Crypto
          </Text>
          <View style={GlobalStyleSheet.inputGroup}>
            <Select
              modal={setModal}
              defaultText={'Select Coin'}
              value={coinData?.name || ''}
            />
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[FONTS.fontSm, { color: colors.text, marginBottom: 6 }]}>
              Available: <Text style={{ color: colors.title }}>56154.4854871 BTC</Text>
            </Text>
            <Input
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button onPress={() => { /* Implement deposit action */ }} title={'Deposit'} />
          </View>
          <CoinSheet modal={modalShow} setModal={setModal} setCoinData={setCoinData} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});

export default DepositSheet;