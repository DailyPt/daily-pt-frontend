import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import InputText, {
  keyBoardType,
  ReturnKeyTypes,
} from '../../components/InputText';
import SafeInputView from '../../components/SafeInputView';
import UserInfoButton from '../../components/UserInfoButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';

const UserHeightScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, birth } = route.params;
  console.log(typeof birth);

  const [enteredHeight, setEnteredHeignt] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!enteredHeight);
  }, [enteredHeight]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'height':
        setEnteredHeignt(enteredValue);
        break;
    }
  }

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Text style={styles.title}>키는 어떻게 되시나요?</Text>
        <Text style={styles.detail}>기초 대사량을 계산하기 위해 필요해요!</Text>
        <View style={{ flexDirection: 'row' }}>
          <InputText
            title={'키'}
            placeholder={'175.0'}
            keyBoardType={keyBoardType.NUMBER}
            returnKeyType={ReturnKeyTypes.NEXT}
            textContentType={'none'}
            value={enteredHeight}
            onChangeText={updateInputValueHandler.bind(this, 'height')}
          />
          <View
            style={{
              position: 'absolute',
              top: Dimensions.get('window').height * 0.37,
              right: Dimensions.get('window').width * 0.06,
            }}
          >
            <Text style={{ fontSize: 26 }}>cm</Text>
          </View>
        </View>

        <UserInfoButton
          title="다음"
          onPress={() =>
            navigation.navigate('Weight', {
              name: name,
              birth: birth,
              height: parseFloat(enteredHeight),
            })
          }
          disabled={disabled}
        />
        <StatusBar style="auto" />
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default UserHeightScreen;
