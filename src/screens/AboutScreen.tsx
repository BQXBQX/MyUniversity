import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {colors} from '../../colors';
import MyButton from '../components/button';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <MyButton
        color={colors.primary100}
        rippleColor={colors.primary200}
        type="noborder">
        <Text>hello</Text>
      </MyButton>
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
    backgroundColor: colors.bg100,
  },
});

export default AboutScreen;
