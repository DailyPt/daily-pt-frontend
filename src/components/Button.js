import { Pressable, StyleSheet, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      style={[styles.button, disabled && { backgroundColor: '#D1D5DB' }]}
      hitSlop={10}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.06,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AD94F7',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default Button;
