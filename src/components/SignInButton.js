import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const SignInButton = ({ title, onPress, disabled, isLoading }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: (() => {
            switch (true) {
              case disabled || isLoading:
                return '#D1D5DB';
              case pressed:
                return '#8B5CF6';
              default:
                return '#AD94F7';
            }
          })(),
        },
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={'#999999'} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

SignInButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AD94F7',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SignInButton;
