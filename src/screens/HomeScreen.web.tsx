import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {colors} from '../../colors';
import {Path, Svg} from 'react-native-svg';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.contentItem]}>
        <Text
          style={styles.contentText}
          onPress={() => navigation.navigate('TimeTable')}>
          Timetable
        </Text>
        <Svg viewBox="0 0 1024 1024" width="80" height="80">
          <Path
            d="M984 704c22.092 0 40-17.908 40-40V240c0-88.224-71.776-160-160-160h-52V40c0-22.092-17.908-40-40-40s-40 17.908-40 40v40h-182V40c0-22.092-17.908-40-40-40s-40 17.908-40 40v40h-180V40c0-22.092-17.908-40-40-40s-40 17.908-40 40v40H160C71.776 80 0 151.776 0 240v624c0 88.224 71.776 160 160 160h704c88.224 0 160-71.776 160-160 0-22.092-17.908-40-40-40s-40 17.908-40 40c0 44.112-35.888 80-80 80h-152V704h272z m-40-80H712V384h232v240zM312 944H160c-44.112 0-80-35.888-80-80v-160h232v240z m0-320H80V384h232v240z m320 320H392V704h240v240z m0-320H392V384h240v240zM80 304v-64c0-44.112 35.888-80 80-80h50v40c0 22.092 17.908 40 40 40s40-17.908 40-40V160h180v40c0 22.092 17.908 40 40 40s40-17.908 40-40V160h182v40c0 22.092 17.908 40 40 40s40-17.908 40-40V160h52c44.112 0 80 35.888 80 80v64H80z"
            p-id="2019"
            fill={colors.accent200}
          />
        </Svg>
      </View>
      <View style={styles.contentItem} />
      <View style={styles.contentItem} />
      <View style={styles.contentItem} />
    </View>
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
    gap: 10,
    paddingTop: '6%',
    justifyContent: 'center',
  },
  contentItem: {
    height: '25%',
    width: '45%',
    backgroundColor: colors.primary100,
    borderRadius: 30,
    elevation: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  contentText: {
    color: colors.accent200,
    fontSize: 20,
    fontFamily: 'RobotoMono-VariableFont_wght',
  },
});
