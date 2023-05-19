import AuthContent from '../../components/AuthContent';
import { createUser } from '../../api/auth';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../../store/auth-context';

const SignUpScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const userCredential = await createUser(email, password);
      authContext.authenticate(userCredential);
    } catch (e) {
      Alert.alert('회원가입 실패', '이메일이 이미 존재합니다!');
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="가입 중..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignUpScreen;
