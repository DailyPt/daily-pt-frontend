import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNutrientTextSearchScreen from '../../screens/AddNutrientScreen/AddNutrientTextSearchScreen';
import AddNutrientSettingScreen from '../../screens/AddNutrientScreen/AddNutrientSettingScreen';

const Stack = createNativeStackNavigator();

const AddNutrientStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AddNutrientTextSearch"
        component={AddNutrientTextSearchScreen}
      />
      <Stack.Screen
        name="AddNutrientSetting"
        component={AddNutrientSettingScreen}
      />
    </Stack.Navigator>
  );
};

export default AddNutrientStack;
