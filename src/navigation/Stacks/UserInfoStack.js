import { Image, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import UserNameScreen from '../../screens/UserInfoScreen/UserNameScreen';
import UserAgeScreen from '../../screens/UserInfoScreen/UserAgeScreen';
import UserHeightScreen from '../../screens/UserInfoScreen/UserHeightScreen';
import UserWeightScreen from '../../screens/UserInfoScreen/UserWeightScreen';
import UserGenderScreen from '../../screens/UserInfoScreen/UserGenderScreen';

import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 60, height: 40 }}
      source={require('../../../assets/Daily_PT_icon_black.png')}
    />
  );
}

const pageIndex = (index) => {
  return <Text>{index}/5</Text>;
};

const UserInfoStack = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerTitleAlign: 'center',
        headerLeft: ({ canGoBack }) => {
          if (!canGoBack) {
            return null;
          }

          return (
            <Pressable onPress={navigation.goBack} hitSlop={10}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color="#333333"
              />
            </Pressable>
          );
        },
      }}
    >
      <Stack.Screen
        name="Name"
        component={UserNameScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: () => {
            return (
              <Pressable hitSlop={10} onPress={authContext.signOut}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color={'#000'}
                />
              </Pressable>
            );
          },
          headerRight: () => pageIndex(1),
        }}
      />
      <Stack.Screen
        name="Age"
        component={UserAgeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => pageIndex(2),
        }}
      />
      <Stack.Screen
        name="Height"
        component={UserHeightScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => pageIndex(3),
        }}
      />
      <Stack.Screen
        name="Weight"
        component={UserWeightScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => pageIndex(4),
        }}
      />
      <Stack.Screen
        name="Gender"
        component={UserGenderScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => pageIndex(5),
        }}
      />
    </Stack.Navigator>
  );
};

export default UserInfoStack;
