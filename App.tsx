/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import MainStack from './src/utils/Stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
RNAsyncStorageFlipper(AsyncStorage as any);
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {StatusBar, useColorScheme} from 'react-native';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} // 设置文字颜色
      />
      <ActionSheetProvider>
        <MainStack />
      </ActionSheetProvider>
    </>
  );
}

export default App;
