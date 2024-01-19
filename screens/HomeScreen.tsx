import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>this is Home Screen!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default HomeScreen;
