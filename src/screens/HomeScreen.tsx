import React, {useRef} from 'react';
import {
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavgationView from '../components/navigationView';
import {colors} from '../../colors';
import MyCard from '../components/card';
import {Path, Svg} from 'react-native-svg';

export const HomeScreen = ({navigation}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition="left"
      ref={drawerRef}
      renderNavigationView={() => <NavgationView />}>
      <View style={styles.container}>
        <MyCard
          width={0.45 * Dimensions.get('window').width}
          height={0.22 * Dimensions.get('window').height}
          radius={15}
          startColor="#e2f3fc"
          endColor="#ffffff"
          rippleColor="#e2f3fc"
          onPress={() => navigation.navigate('TimeTable')}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}>
          <Text style={[styles.itemText, {color: colors.accent100}]}>
            TimeTable
          </Text>
          <Svg
            viewBox="0 0 1024 1024"
            width="200"
            height="200"
            fill={colors.accent100}>
            <Path
              d="M880 948H144c-17.7 0-32-14.3-32-32V180c0-17.7 14.3-32 32-32h736c17.7 0 32 14.3 32 32v736c0 17.7-14.3 32-32 32z m-696-72h656V220H184v656z"
              p-id="9278"
            />
            <Path
              d="M392 292h-56c-4.4 0-8-3.6-8-8V84c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v200c0 4.4-3.6 8-8 8z m296 0h-56c-4.4 0-8-3.6-8-8V84c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v200c0 4.4-3.6 8-8 8z m-504 56h656v72H184z m176 260h-80c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8z m192 0h-80c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8z m192 0h-80c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8zM360 784h-80c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8z m192 0h-80c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8z m192 0h-80c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8z"
              p-id="9279"
            />
          </Svg>
        </MyCard>
        <MyCard
          width={0.45 * Dimensions.get('window').width}
          height={0.22 * Dimensions.get('window').height}
          radius={15}
          startColor="#fffdd8"
          endColor="#ffffff"
          rippleColor="#fffdd8"
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}>
          <Text style={[styles.itemText, {color: '#FFD700'}]}>Grades</Text>
          <Svg viewBox="0 0 1024 1024" width="200" height="200">
            <Path
              d="M800 76H176c-22.1 0-40 17.9-40 40v768c0 22.1 17.9 40 40 40h271.5v-80H216V156h544v350.5h80V116c0-22.1-17.9-40-40-40z"
              p-id="15403"
              fill="#FFD700"
            />
            <Path
              d="M888 894.3L787.6 793.9c19.5-28.4 30.8-62.7 30.8-99.7-0.1-96.9-79.1-175.7-176-175.7-97.2 0-176 78.8-176 176 0 97.1 79 176.1 176.1 176 32.7 0 63.4-9 89.6-24.6L834.3 948l53.7-53.7zM542.4 694.4c0-55.1 44.9-100 100-100s100 44.9 100 100-44.9 100-100 100-100-44.8-100-100z"
              p-id="15404"
              fill="#FFD700"
            />
            <Path
              d="M514.5 504h80.9L478.9 184H369.1L252.6 504h80.9l28.9-79.5h123.1l29 79.5zM391.6 344.5l32.4-89.1 32.4 89.1h-64.8zM720 232h-48v-48h-64v48h-48v64h48v48h64v-48h48z"
              p-id="15405"
              fill="#FFD700"
            />
          </Svg>
        </MyCard>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.bg100,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: Dimensions.get('window').width * 0.04,
    paddingTop: '6%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
