import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';

type keyboardType = TextInputProps['keyboardType'];

interface InputType {
  value: string;
  onChange: any;
  label: string;
  placeholder: string;
  keyboardType?: keyboardType | 'default';
}
const Input = ({
  value,
  onChange,
  label,
  placeholder,
  keyboardType,
}: InputType) => {
  const [isFocused, setisFocused] = useState(false);

  const handleFocus = () => setisFocused(true);
  const handleBlur = () => setisFocused(false);
  return (
    <View
      style={[styles.Input, {borderColor: isFocused ? '#5fbb9f' : '#cae3da'}]}>
      <Animatable.Text
        animation={isFocused ? 'fadeInDown' : ''}
        duration={400}
        style={[styles.InputLabel, {color: isFocused ? '#5fbb9f' : 'gray'}]}>
        {label}
      </Animatable.Text>
      <TextInput
        style={styles.InputField}
        onChangeText={onChange}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  InputLabel: {
    fontSize: 12,
  },
  InputField: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    color: '#5e5e5e',
    fontWeight: '600',
  },
});
