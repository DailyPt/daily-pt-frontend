/* eslint-disable react/prop-types */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';
import { checkIsLogged } from '../api/checkIsLogged';

export const AuthContext = createContext({
  token: '',
  isProfileLogged: false,
  isAuthenticated: false,
  authenticate: () => {},
  signOut: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [isLogged, setIsLogged] = useState();

  const authenticate = async (token) => {
    setAuthToken(token);
    setIsLogged(await checkIsLogged(token));

    AsyncStorage.setItem('token', token);
  };

  const signOut = () => {
    setAuthToken(null);
    setIsLogged(false);
    AsyncStorage.removeItem('token');
  };

  const value = {
    token: authToken,
    isProfileLogged: isLogged,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    signOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
