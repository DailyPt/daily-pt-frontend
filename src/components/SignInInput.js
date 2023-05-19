import { View, StyleSheet, Text, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

const SignInInput = forwardRef(
  ({ title, placeholder, isInvalid, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={[styles.title, isFocused && styles.focusedTitle]}>
          {title}
        </Text>
        <TextInput
          {...props}
          style={[
            styles.input,
            isFocused && styles.focusedInput,
            isInvalid && styles.inputInvalid,
          ]}
          placeholder={placeholder ?? title}
          placeholderTextColor={'#a3a3a3'}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    );
  }
);

SignInInput.displayName = 'SignInInput';

SignInInput.defaultProps = {
  keyboardType: KeyboardTypes.DEFAULT,
  returnKeyType: ReturnKeyTypes.DONE,
};

SignInInput.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardTypes)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  secureTextEntry: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
  },
  focusedTitle: {
    fontWeight: '600',
    color: '#8B5CF6',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    borderColor: '#AD94F7',
    width: Dimensions.get('window').width * 0.9,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    color: '#8B5CF6',
  },
  inputInvalid: {
    borderColor: '#ff0000',
  },
});

export default SignInInput;
