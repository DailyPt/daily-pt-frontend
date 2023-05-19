/* eslint-disable react/prop-types */
import {
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

const NutrientDetailScreen = ({ title }) => {
  return (
    // FlatList 이용 --> 영양제 기록 받아오도록 수정
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.detailContainer} scrollEnabled={true}>
        <Pressable style={styles.detail}>
          <Text>Nutrient Detail for {title}</Text>
        </Pressable>
        <Pressable style={styles.detail}>
          <Text>Nutrient Detail for {title}</Text>
        </Pressable>
        <Pressable style={styles.detail}>
          <Text>Nutrient Detail for {title}</Text>
        </Pressable>
        <Pressable style={styles.detail}>
          <Text>Nutrient Detail for {title}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F8F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    top: '5%',
  },
  detail: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 3,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
});

export default NutrientDetailScreen;
