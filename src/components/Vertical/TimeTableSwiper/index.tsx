import {memo, useEffect, useRef, useState} from 'react';
import React from 'react';
import Swiper from 'react-native-swiper';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {colors} from '../../../../colors';
import TimeTableItem from '../TimeTableItem';

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
          {classData.map((row: any, i: number) => (
            <FlatList
              key={i}
              data={row}
              renderItem={({item, index}) => (
                <TimeTableItem item={item} index={index} />
              )}
              keyExtractor={itemitem => itemitem.id}
              style={styles.container}
            />
          ))}
        </Swiper>
      </>
    );
  },
);

const styles = StyleSheet.create({
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
