import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable } from "react-native";
import DailyDietSummaryScreen from "../../screens/DietScreen/DailyDietSummaryScreen";
import DailyDietDetailScreen from "../../screens/DietScreen/DailyDietDetailScreen";
import DietDaySelectScreen from "../../screens/DietScreen/DietDaySelectScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 80, height: 46 }}
      source={require("../../../assets/Daily_PT_icon_white.png")}
    />
  );
}

const DietTab = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#F8F8FA" },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#AD94F7",
          height: 100,
        },
      }}
    >
      <Stack.Screen
        name="DietSummary"
        component={DailyDietSummaryScreen}
        options={{
          headerLeft: () => {
            return (
              <Pressable hitSlop={10} onPress={authContext.signOut}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color={"#fff"}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate("SettingStack")}
                hitSlop={10}
              >
                <MaterialCommunityIcons name="account" size={24} color="#fff" />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="DaySelect"
        component={DietDaySelectScreen}
        options={{
          headerLeft: ({ canGoBack }) => {
            if (!canGoBack) {
              return null;
            }

            return (
              <Pressable onPress={navigation.goBack} hitSlop={10}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color="#fff"
                />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="DailyDietDetail"
        component={DailyDietDetailScreen}
        options={{
          headerLeft: ({ canGoBack }) => {
            if (!canGoBack) {
              return null;
            }

            return (
              <Pressable onPress={navigation.goBack} hitSlop={10}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color="#fff"
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <Pressable hitSlop={10}>
                <MaterialCommunityIcons
                  name="trash-can"
                  size={24}
                  color={"#fff"}
                />
              </Pressable>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DietTab;
