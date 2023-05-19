/* eslint-disable react/prop-types */
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import InputText, {
  keyBoardType,
  ReturnKeyTypes,
} from '../../components/InputText';
import SafeInputView from '../../components/SafeInputView';
import UserInfoButton from '../../components/UserInfoButton';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

const UserNameScreen = () => {
  const navigation = useNavigation();

  const [enteredName, setEnteredName] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!enteredName);
  }, [enteredName]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
    }
  }

  return (
    <SafeInputView>
      <View>
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.detail}>이름이 맞는지 확인해주세요.</Text>
        <InputText
          title={'이름'}
          placeholder={'홍길동'}
          keyboardType={keyBoardType.DEFAULT}
          returnKeyType={ReturnKeyTypes.NEXT}
          textContentType={'name'}
          value={enteredName}
          onChangeText={updateInputValueHandler.bind(this, 'name')}
        />
        <UserInfoButton
          title="다음"
          disabled={disabled}
          onPress={() => navigation.navigate('Age', { name: enteredName })}
        />
        <StatusBar style="auto" />
      </View>
    </SafeInputView>
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

export default UserNameScreen;
