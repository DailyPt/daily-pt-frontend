/* eslint-disable react/prop-types */
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Pressable,
  Text,
} from 'react-native';
import SignInInput, {
  KeyboardTypes,
  ReturnKeyTypes,
} from '../components/SignInInput';
import SafeInputView from '../components/SafeInputView';
import SignInButton from '../components/SignInButton';
import SocialSignInButton, {
  SELECTIMAGE,
} from '../components/SocialSignInButton';
import HR from '../components/HR';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    passwordConfirm: passwordDontMatch,
  } = credentialsInvalid;

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    setDisabled(!enteredEmail || !enteredPassword);
  }, [enteredEmail, enteredPassword]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEnteredEmail('');
        setEnteredPassword('');
        setDisabled(true);
        setIsLoading(false);
      };
    }, [])
  );

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'passwordConfirm':
        setEnteredPasswordConfirm(enteredValue);
        break;
    }
  }

  const submitHandler = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      onSubmit({
        email: enteredEmail,
        password: enteredPassword,
        passwordConfirm: enteredPasswordConfirm,
      });
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/Daily_PT_icon_black.png')}
          style={styles.icon}
        />
        <SignInInput
          title={'이메일'}
          placeholder={'abc@gmail.com'}
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          value={enteredEmail}
          onChangeText={updateInputValueHandler.bind(this, 'email')}
          onSubmitEditing={() => passwordRef.current.focus()}
          isInvalid={emailIsInvalid}
        />
        {isLogin && (
          <SignInInput
            ref={passwordRef}
            title={'비밀번호'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
            value={enteredPassword}
            onChangeText={updateInputValueHandler.bind(this, 'password')}
            onSubmitEditing={submitHandler}
            isInvalid={passwordIsInvalid}
          />
        )}
        {!isLogin && (
          <SignInInput
            ref={passwordRef}
            title={'비밀번호 (7자 이상)'}
            returnKeyType={ReturnKeyTypes.NEXT}
            secureTextEntry
            value={enteredPassword}
            onChangeText={updateInputValueHandler.bind(this, 'password')}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            isInvalid={passwordIsInvalid}
          />
        )}
        {!isLogin && (
          <SignInInput
            ref={passwordConfirmRef}
            title={'비밀번호 확인'}
            returnKeyType={ReturnKeyTypes.DONE}
            secureTextEntry
            value={enteredPasswordConfirm}
            onChangeText={updateInputValueHandler.bind(this, 'passwordConfirm')}
            onSubmitEditing={submitHandler}
            isInvalid={passwordDontMatch}
          />
        )}
        <View style={styles.buttonContainer}>
          <SignInButton
            title={isLogin ? '로그인' : '회원가입'}
            onPress={submitHandler}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
        {isLogin ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10 }}>아직 계정이 없으신가요?</Text>
            <Pressable onPress={() => navigation.replace('SignUp')}>
              <Text style={{ color: '#8B5CF6', fontWeight: '700' }}>
                회원가입
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10 }}>계정이 이미 있으시다면</Text>
            <Pressable onPress={() => navigation.replace('SignIn')}>
              <Text style={{ color: '#8B5CF6', fontWeight: '700' }}>
                로그인
              </Text>
            </Pressable>
          </View>
        )}

        <HR text={'OR'} />
        <SocialSignInButton imageRoute={SELECTIMAGE.GOOGLE} />

        <StatusBar style="auto" />
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default AuthForm;
