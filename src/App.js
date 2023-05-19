import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import 'moment';
import 'moment/locale/ko';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Root() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authContext.authenticate(storedToken);
      }
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
};

export default App;
