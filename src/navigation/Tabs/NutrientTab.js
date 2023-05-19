import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NutrientSummaryScreen from '../../screens/NutrientScreen/NutrientSummaryScreen';
import DailyNutrientDetailScreen from '../../screens/NutrientScreen/DailyNutrientDetailScreen';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 80, height: 46 }}
      source={require('../../../assets/Daily_PT_icon_white.png')}
    />
  );
}

const NutrientTab = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#F8F8FA' },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#AD94F7',
          height: 100,
        },
      }}
    >
      <Stack.Screen
        name="NutrientSummary"
        component={NutrientSummaryScreen}
        options={{
          headerLeft: () => {
            return (
              <Pressable
                hitSlop={10}
                onPress={() =>
                  navigation.navigate('SettingStack', { screen: 'SettingPush' })
                }
              >
                <MaterialCommunityIcons name="bell" size={24} color={'#fff'} />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate('SettingStack')}
                hitSlop={10}
              >
                <MaterialCommunityIcons name="account" size={24} color="#fff" />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="NutrientDetail"
        component={DailyNutrientDetailScreen}
        options={{
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate('NutrientSummary')}
                hitSlop={10}
              >
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
              <Pressable
                onPress={() =>
                  navigation.navigate('SettingStack', { screen: 'SettingPush' })
                }
                hitSlop={10}
              >
                <MaterialCommunityIcons name="bell" size={24} color={'#fff'} />
              </Pressable>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default NutrientTab;
