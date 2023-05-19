import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import UserInfoButton from '../../components/UserInfoButton';
import GenderButton from '../../components/GenderButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { AuthContext } from '../../store/auth-context';
import { saveUserInfo } from '../../api/userInfo';

const UserGenderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const authContext = useContext(AuthContext);

  const { name, birth, height, weight } = route.params;

  const [enteredGender, setEnteredGender] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleGenderSelect = (gender) => {
    setEnteredGender(gender);

    setDisabled(false);
  };

  const saveData = async () => {
    const userInfo = {
      name: name,
      birth: birth,
      height: height,
      weight: weight,
      gender: enteredGender,
    };

    console.log(JSON.stringify(userInfo));

    await saveUserInfo(authContext.token, userInfo);

    navigation.navigate('Main', { screen: 'Diet' });
  };

  return (
    <View>
      <Text style={styles.title}>성별도 알려주시겠어요?</Text>
      <Text style={styles.detail}>기초 대사량을 계산하기 위해 필요해요!</Text>
      <View style={styles.genderButtonContainer}>
        <GenderButton onSelectGender={handleGenderSelect} />
      </View>

      <UserInfoButton
        title="저장"
        onPress={() => saveData()}
        disabled={disabled}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.1,
    left: Dimensions.get('window').width * 0.06,
    fontSize: 26,
    fontWeight: '900',
  },
  detail: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.15,
    left: Dimensions.get('window').width * 0.06,
    fontSize: 16,
    color: '#666666',
  },
});

export default UserGenderScreen;
