import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../colors';
import MyCard from '../card';

interface TimeTableItemProps {
  data: any[];
  week: number;
}

const TimeTableItem: React.FC<TimeTableItemProps> = ({data, week}) => {
  const [timeTableData, setTimeTableData] = useState<any[]>([]);

  // console.log(data);

  useEffect(() => {
    let filteredData;
    if (week % 2 === 1) {
      filteredData = data.filter(item => item.time.weekState !== '单');
    } else {
      filteredData = data.filter(item => item.time.weekState !== '双');
    }
    setTimeTableData(filteredData);
  }, [data, week]);

  return (
    <>
      <View style={styles.timeTableItemContainer}>
        <View
          style={[
            styles.weekdayContainer,
            {
              height: Dimensions.get('screen').height * 0.08,
              width: Dimensions.get('screen').width,
            },
          ]}>
          <Text>{week + 1}</Text>
          <Text style={[styles.weekdayText]}>Mon</Text>
          <Text style={[styles.weekdayText]}>Thu</Text>
          <Text style={[styles.weekdayText]}>Web</Text>
          <Text style={[styles.weekdayText]}>Thu</Text>
          <Text style={[styles.weekdayText]}>Fri</Text>
          <Text style={[styles.weekdayText]}>Sat</Text>
          <Text style={[styles.weekdayText]}>Sun</Text>
        </View>
        <View style={styles.divider} />
        <View
          style={[
            styles.mainContainer,
            {
              height: Dimensions.get('window').height * 0.88,
              width: Dimensions.get('window').width,
            },
          ]}>
          <View
            style={[
              styles.classNumberContainer,
              {
                width: Dimensions.get('window').width * 0.1,
              },
            ]}>
            <Text style={styles.classNumberItem}>
              1{'\n'} 08:00 {'\n'}08:45
            </Text>
            <Text style={styles.classNumberItem}>
              2{'\n'} 08:50{'\n'} 09:35
            </Text>
            <Text style={styles.classNumberItem}>
              3{'\n'} 09:50 {'\n'}10:35
            </Text>
            <Text style={styles.classNumberItem}>
              4 {'\n'} 10:40{'\n'} 11:25
            </Text>
            <Text style={styles.classNumberItem}>
              5 {'\n'} 11:30{'\n'} 12:15
            </Text>
            <Text style={styles.classNumberItem}>
              6 {'\n'} 13:45{'\n'} 14:30
            </Text>
            <Text style={styles.classNumberItem}>
              7 {'\n'} 14:35{'\n'} 15:20
            </Text>
            <Text style={styles.classNumberItem}>
              8 {'\n'} 15:35 {'\n'}16:20
            </Text>
            <Text style={styles.classNumberItem}>
              9 {'\n'} 16:25 {'\n'}17:10
            </Text>
            <Text style={styles.classNumberItem}>
              10 {'\n'} 18:30{'\n'} 19:15
            </Text>
            <Text style={styles.classNumberItem}>
              11 {'\n'} 19:25{'\n'} 20:10
            </Text>
            <Text style={styles.classNumberItem}>
              12 {'\n'} 20:10{'\n'}21:05
            </Text>
          </View>
          <View
            style={[
              styles.tableContainer,
              {
                height: Dimensions.get('window').height,
              },
            ]}
          />
          {Array.from({length: 12}, (_, i) => (
            <View
              key={i}
              style={[
                styles.tableDividerItem,
                {top: Dimensions.get('window').height * 0.065 * (i + 1)},
              ]}
            />
          ))}

          {timeTableData.map(
            (item, index) =>
              item.time.startWeek <= week + 1 &&
              item.time.endWeek >= week + 1 && (
                <MyCard
                  paddingHorizontal={4}
                  paddingVertical={2}
                  key={index}
                  width={
                    (Dimensions.get('window').width * 0.9) / 7 -
                    Dimensions.get('window').width * 0.01
                  }
                  height={
                    (item.time.endClass - item.time.startClass + 1) *
                    Dimensions.get('window').height *
                    0.063
                  }
                  radius={4}
                  startColor={colors.accent100}
                  endColor={colors.accent100}
                  rippleColor={colors.primary200}
                  cardStyle={{
                    left:
                      Dimensions.get('window').width * 0.105 +
                      ((Dimensions.get('window').width * 0.9) / 7) *
                        (item.time.weekDay - 1),
                    top:
                      Dimensions.get('window').height * 0.001 +
                      Dimensions.get('window').height *
                        0.065 *
                        (item.time.startClass - 1),
                    ...styles.tableItem,
                  }}>
                  <Text style={styles.tableItemText} numberOfLines={3}>
                    {item.course}
                  </Text>
                  <Text style={styles.tableItemText}>{item.location}</Text>
                </MyCard>
              ),
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timeTableItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdayContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Dimensions.get('window').width * 0.1,
    paddingTop: Dimensions.get('window').height * 0.02,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  divider: {
    width: Dimensions.get('window').width,
    height: 1,
    backgroundColor: colors.bg200,
  },
  classNumberContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  classNumberItem: {
    height: Dimensions.get('window').height * 0.065,
    width: Dimensions.get('window').width * 0.1,
    textAlign: 'center',
    display: 'flex',
    fontSize: 12,
  },
  text: {
    color: '#000000',
  },
  weekdayText: {
    width: (Dimensions.get('window').width * 0.9) / 7,
    textAlign: 'center',
  },
  tableContainer: {
    width: 1,
    backgroundColor: colors.bg200,
    position: 'relative',
  },
  tableDividerItem: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    marginLeft: Dimensions.get('window').width * 0.1,
    height: 1,
    backgroundColor: colors.bg200,
  },
  tableItem: {
    position: 'absolute',
  },
  tableItemText: {
    fontSize: 12,
  },
});

export default TimeTableItem;
