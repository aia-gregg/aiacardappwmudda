import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInputProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

interface InputProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (e: string) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  type?: 'text' | 'password';
  numberOfLines?: number;
  icon?: React.ReactNode;
  inputSm?: boolean;
  inputLg?: boolean;
  inputRounded?: boolean;
  style?: any;
  multiline?: boolean;
  errorMessage?: string; // <-- NEW: to display an error message
}

const Input = ({
  placeholder,
  value,
  defaultValue,
  onChangeText,
  onFocus,
  onBlur,
  type,
  numberOfLines,
  multiline,
  icon,
  inputSm,
  inputLg,
  inputRounded,
  style,
  errorMessage, // <-- NEW
  keyboardType, // <-- from TextInputProps
  ...rest // <-- capture any other TextInputProps
}: InputProps) => {
  const [showPass, setShowPass] = useState<boolean>(true);
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={{ marginBottom: 10 }}>
      {/* If icon is present, render it on the left */}
      {icon && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
      )}

      {/* The TextInput itself */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            borderColor: colors.border,
            color: colors.title,
          },
          numberOfLines && {
            height: 'auto',
            paddingVertical: 14,
            textAlignVertical: 'top',
          },
          icon && {
            paddingLeft: 45,
          },
          inputRounded && {
            borderRadius: 45,
          },
          inputSm && {
            height: 40,
          },
          inputLg && {
            height: 58,
          },
          style && {
            ...style,
          },
        ]}
        multiline={multiline ?? false}
        secureTextEntry={type === 'password' ? showPass : false}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType} // <-- pass keyboardType down
        placeholderTextColor={theme.dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.4)'}
        {...rest} // <-- spread any remaining TextInputProps
      />

      {/* Password eye icon */}
      {type === 'password' && (
        <TouchableOpacity
          style={styles.passBtn}
          onPress={() => setShowPass(!showPass)}
        >
          <Feather size={18} color={colors.title} name={showPass ? 'eye-off' : 'eye'} />
        </TouchableOpacity>
      )}

      {/* If there's an errorMessage, display it below */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    ...FONTS.font,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: SIZES.radius_sm,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.1)',
    color: COLORS.white,
  },
  passBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 13,
  },
});

export default Input;
