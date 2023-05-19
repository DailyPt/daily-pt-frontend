import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useContext } from 'react';
import { Asset } from 'expo-asset';
import AuthStack from './Stacks/AuthStack';
import MainStack from './Stacks/MainStack';
import { AuthContext } from '../store/auth-context';

const Navigation = () => {
  const [isReady, setIsReady] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Asset.fromModule(
          require('../../assets/splash.png')
        ).downloadAsync();
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const onReady = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      {!authContext.isAuthenticated ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default Navigation;
