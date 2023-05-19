import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DietTab from './DietTab';
import NutrientTab from './NutrientTab';
import AddFAB from '../../components/AddFAB';
import { useState } from 'react';
import AddSelectScreen from '../../screens/AddSelectScreen';

const Tab = createBottomTabNavigator();

const getDietIcon = ({ color, size }) => {
  return (
    <MaterialCommunityIcons
      name={'silverware-fork-knife'}
      size={size}
      color={color}
    />
  );
};

const getNutrientIcon = ({ color, size }) => {
  return <MaterialCommunityIcons name={'pill'} size={size} color={color} />;
};

const MainTab = () => {
  const [isAddScreenVisible, setIsAddScreenVisible] = useState(false);

  const toggleAddScreen = () => {
    setIsAddScreenVisible(!isAddScreenVisible);
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName={'Diet'}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#AD94F7',
          tabBarInactiveTintColor: '#D1D5DB',
          tabBarStyle: [styles.tabBar],
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tab.Screen
          name={'Diet'}
          component={DietTab}
          options={{
            tabBarIcon: (props) => getDietIcon({ ...props }),
            tabBarLabel: '식단',
          }}
        />
        <Tab.Screen
          name={'Nutrient'}
          component={NutrientTab}
          options={{
            tabBarIcon: (props) => getNutrientIcon({ ...props }),
            tabBarLabel: '영양제',
          }}
        />
      </Tab.Navigator>

      {isAddScreenVisible && <AddSelectScreen />}

      <AddFAB onAdd={toggleAddScreen} />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height * 0.12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.84,
    elevation: 3,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default MainTab;
