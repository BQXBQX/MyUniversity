import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../colors';

interface DataItemProps {
  course: string;
  location: string;
  teacher: string;
  time: {
    startClass: number;
    endClass: number;
    startWeek: number;
    endWeek: number;
    weekDay: number;
    weekState: string;
  };
}

interface DataClassTimeProps {
  id: string;
  startTime: string;
  endTime: string;
}

const DataClassTimeItem = ({item}: {item: DataClassTimeProps}) => (
  <>
    <View style={styles.classTimeItemContainer}>
      <Text style={styles.classTimeItemText}>{item.id}</Text>
      <Text style={styles.classTimeItemText}>{item.startTime}</Text>
      <Text style={styles.classTimeItemText}>{item.endTime}</Text>
    </View>
    <View />
  </>
);

const TimeTablehorizontalScreen = () => {
  const DATA: DataItemProps[] = [
    {
      course: '概率论与数理统计',
      location: '教3－102',
      teacher: '叶军',
      time: {
        endClass: 2,
        endWeek: 18,
        startClass: 1,
        startWeek: 1,
        weekDay: 1,
        weekState: 'all',
      },
    },
    {
      course: '计算机系统基础Ⅰ（混合式）',
      location: '教3－412',
      teacher: '业苇渡',
      time: {
        endClass: 2,
        endWeek: 18,
        startClass: 1,
        startWeek: 1,
        weekDay: 3,
        weekState: 'all',
      },
    },
    {
      course: '数字电路与逻辑设计B',
      location: '教2－520',
      teacher: '邹建华',
      time: {
        endClass: 2,
        endWeek: 18,
        startClass: 1,
        startWeek: 1,
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '编译原理',
      location: '教4－101',
      teacher: '黄海平',
      time: {
        endClass: 2,
        endWeek: 18,
        startClass: 1,
        startWeek: 1,
        weekDay: 5,
        weekState: 'all',
      },
    },
    {
      course: '数字电路与逻辑设计B',
      location: '教3－101',
      teacher: '邹建华',
      time: {
        endClass: 4,
        endWeek: 18,
        startClass: 3,
        startWeek: 2,
        weekDay: 1,
        weekState: '双',
      },
    },
    {
      course: 'Java软件开发（混合式）',
      location: '教2－313',
      teacher: '罗俊',
      time: {
        endClass: 4,
        endWeek: 18,
        startClass: 3,
        startWeek: 1,
        weekDay: 2,
        weekState: 'all',
      },
    },
    {
      course: '概率论与数理统计',
      location: '教3－309',
      teacher: '叶军',
      time: {
        endClass: 4,
        endWeek: 17,
        startClass: 3,
        startWeek: 1,
        weekDay: 3,
        weekState: ' 单',
      },
    },
    {
      course: '编译原理',
      location: '教4－101',
      teacher: '黄海平',
      time: {
        endClass: 4,
        endWeek: 18,
        startClass: 3,
        startWeek: 2,
        weekDay: 3,
        weekState: '双',
      },
    },
    {
      course: '男生足球',
      location: '操场A',
      teacher: '吴瑾',
      time: {
        endClass: 4,
        endWeek: 18,
        startClass: 3,
        startWeek: 1,
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '大学英语IV',
      location: '语音7室(教3-604)',
      teacher: '张志芳',
      time: {
        endClass: 4,
        endWeek: 18,
        startClass: 3,
        startWeek: 1,
        weekDay: 5,
        weekState: '单',
      },
    },
    {
      course: '大学英语IV',
      location: '教2－106',
      teacher: '张志芳',
      time: {
        endClass: 4,
        endWeek: 18,
        startClass: 3,
        startWeek: 1,
        weekDay: 5,
        weekState: '双',
      },
    },
    {
      course: '计算机系统基础Ⅰ（混合式）',
      location: '教3－412',
      teacher: '业苇渡',
      time: {
        endClass: 7,
        endWeek: 18,
        startClass: 6,
        startWeek: 1,
        weekDay: 1,
        weekState: 'all',
      },
    },
    {
      course: '电工电子基础实验B',
      location: '第四实验室',
      teacher: '徐艳卉',
      time: {
        endClass: 7,
        endWeek: 18,
        startClass: 6,
        startWeek: 5,
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '算法分析与设计',
      location: '教2－301',
      teacher: '张怡婷',
      time: {
        endClass: 7,
        endWeek: 18,
        startClass: 6,
        startWeek: 1,
        weekDay: 5,
        weekState: 'all',
      },
    },
    {
      course: '算法 分析与设计',
      location: '教2－301',
      teacher: '张怡婷',
      time: {
        endClass: 9,
        endWeek: 17,
        startClass: 8,
        startWeek: 1,
        weekDay: 1,
        weekState: '单',
      },
    },
    {
      course: '大学英语IV',
      location: '教2－116',
      teacher: '张志芳',
      time: {
        endClass: 9,
        endWeek: 18,
        startClass: 8,
        startWeek: 1,
        weekDay: 2,
        weekState: '双',
      },
    },
    {
      course: '电工电子基础实验B',
      location: '第四实验室',
      teacher: '徐艳卉',
      time: {
        endClass: 9,
        endWeek: 18,
        startClass: 8,
        startWeek: 5,
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '面向对象程序设计及C++',
      location: '教2－101',
      teacher: '梁志红',
      time: {
        endClass: 9,
        endWeek: 18,
        startClass: 8,
        startWeek: 1,
        weekDay: 5,
        weekState: 'all',
      },
    },
    {
      course: '形势与政策IV',
      location: '教3－101',
      teacher: '张琳',
      time: {
        endClass: 12,
        endWeek: 12,
        startClass: 10,
        startWeek: 10,
        weekDay: 4,
        weekState: 'all',
      },
    },
  ];

  const DataClassTime: DataClassTimeProps[] = [
    {id: '1', startTime: '08:00', endTime: '08:45'},
    {id: '2', startTime: '08:50', endTime: '09:35'},
    {id: '3', startTime: '09:50', endTime: '10:35'},
    {id: '4', startTime: '10:40', endTime: '11:25'},
    {id: '5', startTime: '11:30', endTime: '12:15'},
    {id: '6', startTime: '13:45', endTime: '14:30'},
    {id: '7', startTime: '14:35', endTime: '15:20'},
    {id: '8', startTime: '15:35', endTime: '16:20'},
    {id: '9', startTime: '16:25', endTime: '17:10'},
    {id: '10', startTime: '18:30', endTime: '19:15'},
    {id: '11', startTime: '19:25', endTime: '20:10'},
    {id: '12', startTime: '20:20', endTime: '21:05'},
  ];

  return (
    <>
      <View>
        <View style={styles.weekdayTitleContainer}>
          <Text style={styles.weekdayTitleItem}>Mon</Text>
          <Text style={styles.weekdayTitleItem}>Tue</Text>
          <Text style={styles.weekdayTitleItem}>Wed</Text>
          <Text style={styles.weekdayTitleItem}>Thu</Text>
          <Text style={styles.weekdayTitleItem}>Fri</Text>
          <Text style={styles.weekdayTitleItem}>Sat</Text>
          <Text style={styles.weekdayTitleItem}>Sun</Text>
        </View>
        <FlatList
          style={styles.classTimeContainer}
          data={DataClassTime}
          renderItem={({item}) => <DataClassTimeItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  weekdayTitleContainer: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').height * 0.13,
    position: 'absolute',
    left: Dimensions.get('window').width * 0.05,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdayTitleItem: {
    width: (Dimensions.get('window').width * 0.95) / 7,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text100,
  },
  classTimeContainer: {
    marginTop: Dimensions.get('window').height * 0.13,
    // backgroundColor: colors.accent100,
  },
  classTimeItemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  classTimeItemText: {
    color: colors.text100,
  },
});

export default TimeTablehorizontalScreen;
