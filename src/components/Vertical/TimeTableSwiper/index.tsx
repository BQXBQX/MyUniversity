import {memo, useEffect, useRef, useState} from 'react';
import React from 'react';
import Swiper from 'react-native-swiper';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../colors';
import TimeTableItem from '../TimeTableItem';
import {SvgXml} from 'react-native-svg';
import NoClassSvg from '../../../../assets/imgs/noClass2.svg';

export interface DateItemProps {
  id: string;
  courseName: string;
  courseTime: string;
  courseWhere: string;
  courseWeek: string;
  teacher: string;
  homework: boolean;
  dianming: boolean;
  weekState: '单' | '双' | 'all';
}

interface TimeTableSwiperProps {
  classData: DateItemProps[];
  setSelectedDate: (value: Date) => void;
}

const TimeTableSwiper: React.FC<TimeTableSwiperProps> = memo(
  ({classData = [], setSelectedDate}) => {
    const [selectDate, setSelectDate] = useState<Date>(new Date());

    const prevScrollX = useRef(0);

    const test = (event: any) => {
      const {contentOffset} = event.nativeEvent;
      const scrollX = contentOffset.x;
      if (scrollX > prevScrollX.current) {
        const nextDate = new Date(selectDate);
        nextDate.setDate(selectDate.getDate() + 1);
        setSelectDate(nextDate);
      } else if (scrollX < prevScrollX.current) {
        const nextDate = new Date(selectDate);
        nextDate.setDate(selectDate.getDate() - 1);
        setSelectDate(nextDate);
      }
      prevScrollX.current = scrollX;
    };
    useEffect(() => {
      setSelectedDate(selectDate);
    }, [selectDate, setSelectedDate]);

    return (
      <>
        <Swiper
          showsButtons={false}
          showsPagination={false}
          loadMinimal={true}
          onMomentumScrollEnd={test}
          loop={false}>
          {classData.map((row: any, i: number) => {
            const startDate = new Date('2024-02-26');
            // Set the start date of the term
            const thisDay = selectDate; // Get the current date

            // Calculate the number of milliseconds in a week
            const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

            // Calculate the difference in milliseconds between today and the start date
            const timeDiff = thisDay.getTime() - startDate.getTime();

            // Calculate the number of weeks between the start date and today
            const weekNumber = Math.floor(timeDiff / millisecondsPerWeek) + 1;

            let newRow;

            if (weekNumber % 2 === 0) {
              newRow = row.filter((item: DateItemProps) => {
                const weekStateNoSpace = item.weekState.replace(/\s/g, '');
                const startWeek = parseInt(item.courseWeek.split('-')[0]);
                const endWeek = parseInt(item.courseWeek.split('-')[1]);
                // console.log(startWeek, endWeek);

                // Check both conditions
                return (
                  weekStateNoSpace !== '单' &&
                  startWeek <= weekNumber &&
                  endWeek >= weekNumber
                ); // Assuming that courseWeek always has a valid start and end week
              });
            } else if (weekNumber % 2 === 1) {
              newRow = row.filter((item: DateItemProps) => {
                const weekStateNoSpace = item.weekState.replace(/\s/g, '');
                const startWeek = parseInt(item.courseWeek.split('-')[0]);
                const endWeek = parseInt(item.courseWeek.split('-')[1]);
                // console.log(startWeek, endWeek);

                // Check both conditions
                return (
                  weekStateNoSpace !== '单' &&
                  startWeek <= weekNumber &&
                  endWeek >= weekNumber
                ); // Assuming that courseWeek always has a valid start and end week
              });
            }
            // console.log(row);
            if (row.length === 0) {
              return (
                <>
                  <View style={styles.restContainer}>
                    <Text style={styles.restText}>
                      There are no classes today. Let's have a rest!!!
                    </Text>
                    <SvgXml
                      xml={NoClassSvg}
                      width={Dimensions.get('window').width * 0.8}
                      height={300}
                    />
                  </View>
                </>
              );
            } else {
              return (
                <FlatList
                  key={i}
                  data={newRow}
                  renderItem={({item, index}) => (
                    <TimeTableItem item={item} index={index} />
                  )}
                  keyExtractor={item => `${item.courseName}${item.id}`}
                  style={styles.container}
                />
              );
            }
          })}
        </Swiper>
      </>
    );
  },
);

const styles = StyleSheet.create({
  restContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  restText: {
    color: colors.text100,
    fontSize: 30,
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    textAlign: 'center',
  },
  container: {
    paddingLeft: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.01,
    width: Dimensions.get('window').width,
    backgroundColor: colors.bg200,
  },
  messageItemSvg: {
    position: 'absolute',
    opacity: 1,
    right: 3,
    bottom: 10,
  },
  messageItem: {
    marginBottom: Dimensions.get('window').height * 0.015,
  },
  messageItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageItemMain: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  messageItemMainText: {
    fontSize: 16,
  },
  messageItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  reminderContainer: {
    backgroundColor: '#ff0000',
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default TimeTableSwiper;
