import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const AddNutrientSettingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.setting}>
        <Text style={styles.foodTitle}>락토핏 생유산균 골드</Text>
        <Text style={styles.foodCalorie}>255kcal</Text>
        <View
          style={{
            position: 'absolute',
            top: '30%',
            width: Dimensions.get('window').width,
            borderColor: '#F3F4F6',
            borderWidth: 5,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: '50%',
          }}
        ></View>
        <View style={styles.setButton}>
          <Button
            title={'저장하기'}
            onPress={() => navigation.navigate('Main', { screen: 'Nutrient' })}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  setting: {
    position: 'absolute',
    top: '10%',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F8F8FA',
    alignItems: 'center',
  },
  foodTitle: {
    fontWeight: '700',
    fontSize: 30,
    position: 'absolute',
    top: '5%',
  },
  foodCalorie: {
    color: '#999999',
    fontSize: 15,
    position: 'absolute',
    top: '10%',
  },
  setButton: {
    position: 'absolute',
    bottom: '5%',
  },
});

export default AddNutrientSettingScreen;
