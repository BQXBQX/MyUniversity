import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TimeTableScreen from '../screens/TimeTableScreen';
import HomeTabs from './HomeTabs';
import {NavigationContainer} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [screenOrientation, setScreenOrientation] = useState<string>('');

  const updateScreenOrientation = (orientation: string) => {
    setScreenOrientation(orientation.split('-')[0]);
    console.log('listener', orientation);
  };

  useEffect(() => {
    Orientation.addOrientationListener(updateScreenOrientation);
    return () => {
      Orientation.removeOrientationListener(updateScreenOrientation);
    };
  }, []);

  useEffect(() => {
    console.log(screenOrientation);
  }, [screenOrientation]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNav">
        <Stack.Screen
          name="TimeTable"
          component={TimeTableScreen}
          options={{
            // headerStyle: styles.headerStyle,
            headerShown: false,
            navigationBarColor: 'rgba(0,0,0,0)',
          }}
        />
        <Stack.Screen
          name="TabNav"
          component={HomeTabs}
          options={{
            title: 'My University',
            navigationBarColor: '#f5f4f1',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
