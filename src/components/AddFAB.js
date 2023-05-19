import {
  Pressable,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AddFAB = ({ onAdd }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonRotation = useRef(new Animated.Value(0)).current;

  const toAdd = () => {
    setIsPressed(true);
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const toClose = () => {
    if (isPressed) {
      setIsPressed(false);
      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 20,
      }).start();
    }
  };

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '315deg'],
  });

  const onPressButton = () => {
    isPressed ? toClose() : toAdd();
  };

  return (
    <>
      <Animated.View
        style={[styles.container, { transform: [{ rotate: spin }] }]}
      >
        <Pressable
          style={[
            styles.button,
            styles.shadow,
            isPressed && {
              backgroundColor: '#8B5CF6',
            },
          ]}
          onPress={() => {
            onPressButton();
            onAdd();
          }}
        >
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </Pressable>
      </Animated.View>
    </>
  );
};

AddFAB.propTypes = {
  onAdd: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.12,
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 999,
    padding: 4,
    backgroundColor: '#AD94F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    }),
  },
});

export default AddFAB;
