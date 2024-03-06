import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Path, Svg, SvgXml} from 'react-native-svg';
import {colors} from '../../colors';
import {FloatingAction} from 'react-native-floating-action';
import RNCalendarEvents from 'react-native-calendar-events';
import SeaPng from '../../assets/imgs/sea.png';
import SeaWhitePng from '../../assets/imgs/seawhite.png';
import LinearGradient from 'react-native-linear-gradient';
import TimeTableSwiper from '../components/Vertical/TimeTableSwiper';
import ClassSvg from '../../assets/imgs/class.svg';

interface TimeTableVerticalScreenProps {
  thisDayDate?: any;
}
const TimeTableVerticalScreen: React.FC<TimeTableVerticalScreenProps> = ({
  thisDayDate,
}) => {
  let verticalData = [];
  const [classData, setClassData] = useState<DateItemProps[]>([]);

  const startClass = [
    '8:00',
    '8:50',
    '9:50',
    '10:40',
    '11:30',
    '13:45',
    '14:35',
    '15:35',
    '16:25',
    '18:30',
    '19:25',
    '20:20',
  ];

  const endClass = [
    '8:45',
    '9:35',
    '10:35',
    '11:25',
    '12:15',
    '14:30',
    '15:20',
    '16:20',
    '17:10',
    '19:15',
    '20:10',
    '21:05',
  ];

  useEffect(() => {
    const date = new Date();
    const dateWeekday = Math.abs((date.getDay() - 1) % 7);

    for (let index = dateWeekday + 1; index < dateWeekday + 8; index++) {
      verticalData.push(
        thisDayDate?.filter(
          (item: any) => item.time.weekDay === Math.abs(index % 7),
        ),
      );
    }
    const newData = verticalData.map((row, rowIndex: number) =>
      row.map((item: any, index: number) => {
        return {
          id: `${rowIndex}${index}${item.course}`,
          courseName: item.course,
          courseTime: `${startClass[item.time.startClass - 1]}-${
            endClass[item.time.endClass - 1]
          }`,
          courseWhere: item.location,
          courseWeek: `${item.time.startWeek}-${item.time.endWeek}`,
          teacher: item.teacher,
          homework: false,
          diaming: false,
          weekState: item.time.weekState,
        };
      }),
    );
    setClassData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface DateItemProps {
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

  const actions = [
    {
      text: 'Export',
      name: 'Derive',
      icon: (
        <Svg viewBox="0 0 1138 1024" p-id="9800" width="22" height="22">
          <Path
            d="M763.092985 541.233279l251.040783-235.275693a29.337684 29.337684 0 0 0 1.461664-42.440457L781.468189 12.946166a36.541599 36.541599 0 0 0-63.373572 19.001632l-16.965743 485.95106a36.541599 36.541599 0 0 0 61.859707 23.282219"
            fill={colors.bg100}
            p-id="9801"
          />
          <Path
            d="M747.171289 356.750408a436.411093 436.411093 0 0 0-396.215335 347.823817 436.828711 436.828711 0 0 1-6.264274-79.712887 437.559543 437.559543 0 0 1 405.194128-428.78956z"
            fill={colors.bg100}
            p-id="9802"
          />
          <Path
            d="M898.610114 971.4323H239.608483a187.249592 187.249592 0 0 1-187.092985-187.040783v-206.564437a52.202284 52.202284 0 1 1 104.404567 0v206.40783a82.74062 82.74062 0 0 0 82.688418 82.792822h659.001631a82.74062 82.74062 0 0 0 82.636216-82.636215v-206.564437a52.202284 52.202284 0 0 1 104.404567 0v206.40783a187.249592 187.249592 0 0 1-187.040783 187.19739z"
            fill={colors.bg100}
            p-id="9803"
          />
        </Svg>
      ),
      position: 1,
      color: colors.accent100,
    },
  ];

  const DATA: DateItemProps[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3addsad53abb28ba',
      courseName: '数字电路和系统设计',
      courseTime: '09:35 - 10:20',
      courseWhere: '教3 - 101',
      courseWeek: '1-18',
      teacher: '看来三',
      homework: false,
      dianming: false,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aadsad97f63',
      courseName: '模拟电路和设计',
      courseTime: '09:35 - 10:20',
      courseWhere: 'hello world',
      courseWeek: '1-18',
      teacher: '看来三',
      homework: false,
      dianming: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-155aasasdasd71e29',
      courseName: '大学英语4',
      courseTime: '09:35 - 10:20',
      courseWhere: 'hello world',
      courseWeek: '1-18',
      teacher: '看来三',
      homework: false,
      dianming: false,
    },
    {
      id: '58694a0f-3da1-471f-bsdasdad96-',
      courseName: '大学英语4',
      courseTime: '09:35 - 10:20',
      courseWhere: 'hello world',
      courseWeek: '1-18',
      teacher: '看来三',
      homework: false,
      dianming: false,
    },
    {
      id: '58694a0f-3ddasdasdasda1--bd96-',
      courseName: '大学英语4',
      courseTime: '09:35 - 10:20',
      courseWhere: 'hello world',
      courseWeek: '1-18',
      teacher: '看来三',
      homework: false,
      dianming: false,
    },
  ];

  const formatTime = (time: any) => {
    const date = new Date();
    const [hours, minutes] = time.split(':');

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const formattedTime = date.toISOString();
    // console.log(formattedTime, 'formattedTime');
    return formattedTime;
  };

  const handleActionButton = (name?: string) => {
    if (name === 'Derive') {
      RNCalendarEvents.requestPermissions();
      for (let index = 0; index < DATA.length; index++) {
        RNCalendarEvents.saveEvent(DATA[index].courseName, {
          calendarId: '141',
          startDate: `${formatTime(DATA[index].courseTime.split('-')[0])}`,
          endDate: `${formatTime(DATA[index].courseTime.split('-')[1])}`,
          location: 'Los Angeles, CA',
          notes: 'Bring sunglasses',
          recurrence: 'weekly',
          description: '',
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  // const {showActionSheetWithOptions} = useActionSheet();

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const test = (value: Date) => {
    setSelectDate(value);
  };

  return (
    <>
      <View style={styles.dateTitleContainer}>
        <LinearGradient
          style={styles.dateTitleContent}
          colors={['#e5f4fc', colors.accent100]}>
          <Text style={[styles.dataTitle, {fontSize: 20}]}>
            {selectDate.getFullYear()}/{selectDate.getMonth() + 1}/
            {selectDate.getDate()}
          </Text>
          <Text style={[styles.dataTitle, {fontSize: 28}]}>
            {weekdays[selectDate.getDay()]}
          </Text>
          <SvgXml
            xml={ClassSvg}
            width={110}
            height={110}
            style={styles.titleImg}
          />
        </LinearGradient>
        <Image source={SeaPng} style={styles.sea} />
        <Image source={SeaWhitePng} style={styles.sea} />
        <View style={styles.divider} />
      </View>
      <TimeTableSwiper classData={classData} setSelectedDate={test} />
      <FloatingAction
        actions={actions}
        onPressItem={handleActionButton}
        distanceToEdge={{vertical: 20, horizontal: 15}}
        color={colors.accent100}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.01,
    width: Dimensions.get('window').width,
    backgroundColor: colors.bg300,
  },
  titleImg: {
    position: 'absolute',
    bottom: -4,
    right: 12,
  },
  dateTitleContainer: {
    width: Dimensions.get('window').width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {fontWeight: 'bold'},
  dateTitleContent: {
    backgroundColor: '#9ad5f3',
    padding: 30,
    width: Dimensions.get('window').width,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  sea: {
    width: Dimensions.get('window').width,
    objectFit: 'contain',
    position: 'absolute',
    bottom: 0,
    height: 23,
  },
  dateTitle: {
    backgroundColor: colors.accent100,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    color: colors.bg100,
  },
  divider: {
    height: 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#f1f1f1',
  },
  messageItem: {
    marginBottom: Dimensions.get('window').height * 0.015,
  },
  messageItemSvg: {
    position: 'absolute',
    opacity: 1,
    right: 3,
    bottom: 10,
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
  bottomModalContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  bottomModalItemsContainer: {
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  bottomModalItem: {
    width: Dimensions.get('window').width * 0.8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomModalItemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomModalButtonContainer: {
    width: Dimensions.get('window').width * 0.85,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  bottomModalButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
  bottomModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent200,
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

export default TimeTableVerticalScreen;
