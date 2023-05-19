import { TextInput, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const keyBoardType = {
  DEFAULT: 'default',
  NUMBER: 'numeric',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

const InputText = ({ placeholder, keyBoardType, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[styles.input, isFocused && styles.focusedInput]}
      placeholder={placeholder}
      placeholderTextColor={'#a3a3a3'}
      keyboardType={keyBoardType}
      autoCapitalize="none"
      autoCorrect={false}
      textContentType="none"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

InputText.defaultProps = {
  keyBoardType: keyBoardType.DEFAULT,
};

InputText.propTypes = {
  placeholder: PropTypes.string,
  keyBoardType: PropTypes.oneOf(Object.values(keyBoardType)),
  textContentType: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.33,
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    borderBottomColor: '#AD94F7',
    borderBottomWidth: 1,
    padding: 10,
    margin: 20,
    fontSize: 26,
  },
  focusedInput: {
    // fill
  },
});

export default InputText;
