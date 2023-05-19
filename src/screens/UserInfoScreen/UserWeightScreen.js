import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import InputText, {
  keyBoardType,
  ReturnKeyTypes,
} from '../../components/InputText';
import SafeInputView from '../../components/SafeInputView';
import UserInfoButton from '../../components/UserInfoButton';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';

const UserWeightScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, birth, height } = route.params;

  const [enteredWeight, setEnteredWeignt] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!enteredWeight);
  }, [enteredWeight]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'weight':
        setEnteredWeignt(enteredValue);
        break;
    }
  }

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Text style={styles.title}>몸무게를 여쭤봐도 될까요?</Text>
        <Text style={styles.detail}>기초 대사량을 계산하기 위해 필요해요!</Text>
        <View style={{ flexDirection: 'row' }}>
          <InputText
            title={'몸무게'}
            placeholder={'65.0'}
            keyBoardType={keyBoardType.NUMBER}
            returnKeyType={ReturnKeyTypes.NEXT}
            textContentType={'none'}
            value={enteredWeight}
            onChangeText={updateInputValueHandler.bind(this, 'weight')}
          />

          <View
            style={{
              position: 'absolute',
              top: Dimensions.get('window').height * 0.37,
              right: Dimensions.get('window').width * 0.06,
            }}
          >
            <Text style={{ fontSize: 26 }}>kg</Text>
          </View>
        </View>
        <UserInfoButton
          title="다음"
          onPress={() =>
            navigation.navigate('Gender', {
              name: name,
              birth: birth,
              height: height,
              weight: parseFloat(enteredWeight),
            })
          }
          disabled={disabled}
        />
        <StatusBar style="auto" />
      </View>
    </SafeInputView>
  );
};

UserWeightScreen.propTypes = {
  navigation: PropTypes.object,
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

export default UserWeightScreen;
