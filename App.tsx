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

function App(): React.JSX.Element {
  return (
    <ActionSheetProvider>
      <MainStack />
    </ActionSheetProvider>
  );
}

export default App;
