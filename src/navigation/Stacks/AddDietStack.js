import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDietImageScreen from "../../screens/AddDietScreen/AddDietImageScreen";
import AddDietAnalyzeScreen from "../../screens/AddDietScreen/AddDietAnalyzeScreen";
import AddDietResultScreen from "../../screens/AddDietScreen/AddDietResultScreen";
import AddDietSettingScreen from "../../screens/AddDietScreen/AddDietSettingScreen";
import AddDietTextSearchScreen from "../../screens/AddDietScreen/AddDietTextSearchScreen";
import AddDietDetailScreen from "../../screens/AddDietScreen/AddDietDetailScreen";
import AddDietRecordScreen from "../../screens/AddDietScreen/AddDietRecordScreen";

const Stack = createNativeStackNavigator();

const AddDietStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddDietImage" component={AddDietImageScreen} />
      <Stack.Screen name="AddDietAnalyze" component={AddDietAnalyzeScreen} />
      <Stack.Screen name="AddDietResult" component={AddDietResultScreen} />
      <Stack.Screen name="AddDietSetting" component={AddDietSettingScreen} />
      <Stack.Screen
        name="AddDietTextSearch"
        component={AddDietTextSearchScreen}
      />
      <Stack.Screen name="AddDietDetail" component={AddDietDetailScreen} />
      <Stack.Screen name="AddDietRecord" component={AddDietRecordScreen} />
    </Stack.Navigator>
  );
};

export default AddDietStack;
