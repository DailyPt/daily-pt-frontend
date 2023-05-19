import AuthContent from '../../components/AuthContent';
import { signIn } from '../../api/auth';
import { useContext, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../../store/auth-context';

const SignInScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  const signInHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const userCredential = await signIn(email, password);
      authContext.authenticate(userCredential);
    } catch (e) {
      Alert.alert('로그인 실패', '이메일과 비밀번호를 확인하세요!');
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="로그인 중..." />;
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
};

export default SignInScreen;
