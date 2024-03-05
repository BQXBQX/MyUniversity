import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TimeTableScreen from '../screens/TimeTableScreen';
import HomeTabs from './HomeTabs';
import {NavigationContainer} from '@react-navigation/native';
import {Dimensions, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const Stack = createStackNavigator();

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
            headerStyle: styles.headerStyle,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TabNav"
          component={HomeTabs}
          options={{title: 'My University'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: Dimensions.get('window').height * 0.07,
  },
});

export default MainStack;
