import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SettingMainScreen from '../../screens/SettingScreen/SettingMainScreen';
import SettingInfoScreen from '../../screens/SettingScreen/SettingInfoScreen';
import SettingPushScreen from '../../screens/SettingScreen/SettingPushScreen';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#AD94F7',
          height: 100,
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="SettingMain"
        component={SettingMainScreen}
        options={{
          title: '설정',
          headerLeft: () => {
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
        name="SettingInfo"
        component={SettingInfoScreen}
        options={{
          title: '내 정보 수정',
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate('SettingMain')}
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
        }}
      />

      <Stack.Screen
        name="SettingPush"
        component={SettingPushScreen}
        options={{
          title: '알림',
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate('SettingMain')}
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
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
