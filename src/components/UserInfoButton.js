import { Pressable, StyleSheet, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';

const UserInfoButton = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: (() => {
            switch (true) {
              case disabled:
                return '#D1D5DB';
              case pressed:
                return '#8B5CF6';
              default:
                return '#AD94F7';
            }
          })(),
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

UserInfoButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.75,
    left: Dimensions.get('window').width * 0.06,
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

export default UserInfoButton;
