import React from 'react';
import AboutScreen from '../screens/AboutScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../../colors';
import TabBarIcon from '../components/tabBarIcon';
import {HomeScreen} from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            return (
              <TabBarIcon
                routeName={route.name}
                focused={focused}
                color={color}
                size={size}
              />
            );
          },
          tabBarInactiveBackgroundColor: colors.bg200,
          tabBarActiveBackgroundColor: colors.bg200,
          tabBarActiveTintColor: colors.accent200,
          tabBarInactiveTintColor: colors.text200,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabs;
