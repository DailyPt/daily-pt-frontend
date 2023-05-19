import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../../screens/AuthenticationScreen/SignUpScreen';
import SignInScreen from '../../screens/AuthenticationScreen/SignInScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
