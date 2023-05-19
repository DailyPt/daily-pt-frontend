import { Pressable, StyleSheet, Image, View, Platform } from 'react-native';
import PropTypes from 'prop-types';

export const SELECTIMAGE = {
  APPLE: require('../../assets/AppleLogo.png'),
  GOOGLE: require('../../assets/GoogleLogo.png'),
};

const SocialSignInButton = ({ imageRoute, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Image source={imageRoute} style={styles.icon} />
      </Pressable>
    </View>
  );
};

SocialSignInButton.propTypes = {
  onPress: PropTypes.func,
  imageRoute: PropTypes.oneOf(Object.values(SELECTIMAGE)).isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 999,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
    }),
  },
  icon: {
    width: 60,
    height: 60,
  },
});

export default SocialSignInButton;
