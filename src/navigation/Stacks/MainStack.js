import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from '../Tabs/MainTab';
import SettingStack from './SettingStack';
import AddDietStack from './AddDietStack';
import AddNutrientStack from './AddNutrientStack';
import UserInfoStack from './UserInfoStack';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authContext.isProfileLogged && (
        <Stack.Screen name="UserInfo" component={UserInfoStack} />
      )}
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="SettingStack" component={SettingStack} />
      <Stack.Screen name="AddDiet" component={AddDietStack} />
      <Stack.Screen name="AddNutrient" component={AddNutrientStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
