import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const AddDietAnalyzeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  console.log(data);

  // image uri --> form data --> post

  // formData.append('image', {
  //   uri: imageUri,
  //   name: 'photo.jpg',
  //   type: 'image/jpeg',
  // });

  // 백엔드 연동 후에는 분석 결과를 받으면 넘어가는 걸로... 지금은 임시로 5초 timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AddDietResult', { imageUri: data });
    }, 1000);

    return () => {
      clearTimeout(timer); // Clear the timer when the component is unmounted
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI 식단 분석 중</Text>
      <Text style={[styles.subtitle, { position: 'absolute', top: '20%' }]}>
        아주 잠시만 조금만 기다려주세요!
      </Text>
      <Image
        style={styles.image}
        source={require('../../../assets/AddDietLoading.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    position: 'absolute',
    top: '15%',
  },
  subtitle: {
    color: '#999999',
    fontSize: 15,
  },
  image: {},
});

export default AddDietAnalyzeScreen;
