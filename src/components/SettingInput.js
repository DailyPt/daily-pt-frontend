import { TextInput, Dimensions, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { useState } from "react";

export const keyBoardType = {
  DEFAULT: "default",
  NUMBER: "numeric",
};

export const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

const SettingInput = ({ placeholder, keyBoardType, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[styles.input, isFocused && styles.focusedInput]}
      placeholder={placeholder}
      placeholderTextColor={"#a3a3a3"}
      keyboardType={keyBoardType}
      autoCapitalize="none"
      autoCorrect={false}
      textContentType="none"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

SettingInput.defaultProps = {
  keyBoardType: keyBoardType.DEFAULT,
};

SettingInput.propTypes = {
  placeholder: PropTypes.string,
  keyBoardType: PropTypes.oneOf(Object.values(keyBoardType)),
  textContentType: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#F8F8FA",
    borderBottomColor: "#AD94F7",
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 20,
  },
});

export default SettingInput;
