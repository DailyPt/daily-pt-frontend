import { View, StyleSheet } from 'react-native';
import AddButton, { SELECTMODE, SELECTIMAGE } from '../components/AddButton';
import { useNavigation } from '@react-navigation/native';

const AddSelectScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.diet}>
        <AddButton
          title={SELECTMODE.DIET}
          imageRoute={SELECTIMAGE.DIET}
          onPress={() => {
            navigation.navigate('AddDiet');
          }}
        />
      </View>

      <View style={styles.nutrient}>
        <AddButton
          title={SELECTMODE.NUTRIENT}
          imageRoute={SELECTIMAGE.NUTRIENT}
          onPress={() => {
            navigation.navigate('AddNutrient');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diet: {
    position: 'absolute',
    top: '75%',
    left: '35%',
  },
  nutrient: {
    position: 'absolute',
    top: '75%',
    right: '35%',
  },
});

export default AddSelectScreen;
