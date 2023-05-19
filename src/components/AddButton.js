import { Pressable, StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';

export const SELECTMODE = {
  DIET: '식단',
  NUTRIENT: '영양제',
};

export const SELECTIMAGE = {
  DIET: require('../../assets/AddDietIcon.png'),
  NUTRIENT: require('../../assets/AddNutrientIcon.png'),
};

const AddButton = ({ title, imageRoute, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Image source={imageRoute} style={styles.icon} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

AddButton.propTypes = {
  title: PropTypes.oneOf(Object.values(SELECTMODE)).isRequired,
  onPress: PropTypes.func,
  imageRoute: PropTypes.oneOf(Object.values(SELECTIMAGE)).isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 999,
    padding: 4,
    backgroundColor: '#666668',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    position: 'absolute',
    top: 40,
    color: '#fff',
    fontWeight: '700',
  },
});

export default AddButton;
