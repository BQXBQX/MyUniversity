import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {getTimeTable} from '../utils/getTimeTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';
import TimeTableVerticalScreen from './TimeTableVerticalScreen';
import TimeTablehorizontalScreen from './TimeTableHorizontalScreen';

const TimeTableScreen = () => {
  const [useInformation, setUseInformation] = useState<any[]>([]);
  const [state, setState] = useState({open: false});
  const [screenOrientation, setScreenOrientation] = useState<string>('');
  const onStateChange = ({open}) => setState({open});

  const updateScreenOrientation = orientation => {
    setScreenOrientation(orientation.split('-')[0]);
  };

  useEffect(() => {
    console.log('result', screenOrientation);
    console.log(Dimensions.get('window'));
  }, [screenOrientation]);

  useEffect(() => {
    Orientation.addOrientationListener(updateScreenOrientation);
    return () => {
      Orientation.removeOrientationListener(updateScreenOrientation);
    };
  }, []);

  const {open} = state;

  function convertToNumber(chineseCharacter: string) {
    let number;

    switch (chineseCharacter) {
      case '一':
        number = 1;
        break;
      case '二':
        number = 2;
        break;
      case '三':
        number = 3;
        break;
      case '四':
        number = 4;
        break;
      case '五':
        number = 5;
        break;
      case '六':
        number = 6;
        break;
      case '日':
        number = 7;
        break;
      default:
        number = NaN;
        break;
    }

    return number;
  }

  const getDate = () => {
    getTimeTable().then(res => {
      const newUseInformation: any[] = res;
      const newData = newUseInformation.map(item => ({
        time: {
          startClass: item.classTime[1].split(',')[0],
          endClass:
            item.classTime[1].split(',')[
              item.classTime[1].split(',').length - 1
            ],
          startWeek: item.duration.split('-')[0],
          endWeek: item.duration.split('-')[1],
          weekDay: convertToNumber(item.dayOfWeek),
          weekState: item.weekState,
        },
        location: item.location,
        teacher: item.teacher,
        course: item.courseName,
      }));
      setUseInformation(newData);
    });
  };

  useEffect(() => {
    storeData(useInformation);
  }, [useInformation]);

  const fetchData = async () => {
    try {
      // Perform asynchronous operations here
      const data = await getData();
      data && setUseInformation(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      if (value[0].time !== undefined) {
        await AsyncStorage.setItem('information', jsonValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('information');

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      // error reading value
      console.log(error);
    }
  };

  const Data = [
    {
      course: '概率论与数理统计',
      location: '教3－102',
      teacher: '叶军',
      time: {
        endClass: '2',
        endWeek: '18',
        startClass: '1',
        startWeek: '1',
        weekDay: 1,
        weekState: 'all',
      },
    },
    {
      course: '计算机系统基础Ⅰ（混合式）',
      location: '教3－412',
      teacher: '业苇渡',
      time: {
        endClass: '2',
        endWeek: '18',
        startClass: '1',
        startWeek: '1',
        weekDay: 3,
        weekState: 'all',
      },
    },
    {
      course: '数字电路与逻辑设计B',
      location: '教2－520',
      teacher: '邹建华',
      time: {
        endClass: '2',
        endWeek: '18',
        startClass: '1',
        startWeek: '1',
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '编译原理',
      location: '教4－101',
      teacher: '黄海平',
      time: {
        endClass: '2',
        endWeek: '18',
        startClass: '1',
        startWeek: '1',
        weekDay: 5,
        weekState: 'all',
      },
    },
    {
      course: '数字电路与逻辑设计B',
      location: '教3－101',
      teacher: '邹建华',
      time: {
        endClass: '4',
        endWeek: '18',
        startClass: '3',
        startWeek: '2',
        weekDay: 1,
        weekState: '双',
      },
    },
    {
      course: 'Java软件开发（混合式）',
      location: '教2－313',
      teacher: '罗俊',
      time: {
        endClass: '4',
        endWeek: '18',
        startClass: '3',
        startWeek: '1',
        weekDay: 2,
        weekState: 'all',
      },
    },
    {
      course: '概率论与数理统计',
      location: '教3－309',
      teacher: '叶军',
      time: {
        endClass: '4',
        endWeek: '17',
        startClass: '3',
        startWeek: '1',
        weekDay: 3,
        weekState: ' 单',
      },
    },
    {
      course: '编译原理',
      location: '教4－101',
      teacher: '黄海平',
      time: {
        endClass: '4',
        endWeek: '18',
        startClass: '3',
        startWeek: '2',
        weekDay: 3,
        weekState: '双',
      },
    },
    {
      course: '男生足球',
      location: '操场A',
      teacher: '吴瑾',
      time: {
        endClass: '4',
        endWeek: '18',
        startClass: '3',
        startWeek: '1',
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '大学英语IV',
      location: '语音7室(教3-604)',
      teacher: '张志芳',
      time: {
        endClass: '4',
        endWeek: '18',
        startClass: '3',
        startWeek: '1',
        weekDay: 5,
        weekState: '单',
      },
    },
    {
      course: '大学英语IV',
      location: '教2－106',
      teacher: '张志芳',
      time: {
        endClass: '4',
        endWeek: '18',
        startClass: '3',
        startWeek: '1',
        weekDay: 5,
        weekState: '双',
      },
    },
    {
      course: '计算机系统基础Ⅰ（混合式）',
      location: '教3－412',
      teacher: '业苇渡',
      time: {
        endClass: '7',
        endWeek: '18',
        startClass: '6',
        startWeek: '1',
        weekDay: 1,
        weekState: 'all',
      },
    },
    {
      course: '电工电子基础实验B',
      location: '第四实验室',
      teacher: '徐艳卉',
      time: {
        endClass: '7',
        endWeek: '18',
        startClass: '6',
        startWeek: '5',
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '算法分析与设计',
      location: '教2－301',
      teacher: '张怡婷',
      time: {
        endClass: '7',
        endWeek: '18',
        startClass: '6',
        startWeek: '1',
        weekDay: 5,
        weekState: 'all',
      },
    },
    {
      course: '算法 分析与设计',
      location: '教2－301',
      teacher: '张怡婷',
      time: {
        endClass: '9',
        endWeek: '17',
        startClass: '8',
        startWeek: '1',
        weekDay: 1,
        weekState: '单',
      },
    },
    {
      course: '大学英语IV',
      location: '教2－116',
      teacher: '张志芳',
      time: {
        endClass: '9',
        endWeek: '18',
        startClass: '8',
        startWeek: '1',
        weekDay: 2,
        weekState: '双',
      },
    },
    {
      course: '电工电子基础实验B',
      location: '第四实验室',
      teacher: '徐艳卉',
      time: {
        endClass: '9',
        endWeek: '18',
        startClass: '8',
        startWeek: '5',
        weekDay: 4,
        weekState: 'all',
      },
    },
    {
      course: '面向对象程序设计及C++',
      location: '教2－101',
      teacher: '梁志红',
      time: {
        endClass: '9',
        endWeek: '18',
        startClass: '8',
        startWeek: '1',
        weekDay: 5,
        weekState: 'all',
      },
    },
    {
      course: '形势与政策IV',
      location: '教3－101',
      teacher: '张琳',
      time: {
        endClass: '12',
        endWeek: '12',
        startClass: '10',
        startWeek: '10',
        weekDay: 4,
        weekState: 'all',
      },
    },
  ];

  if (screenOrientation === 'PORTRAIT' || screenOrientation === '') {
    return <TimeTableVerticalScreen thisDayDate={Data} />;
  } else {
    return <TimeTablehorizontalScreen />;
  }
};

export default TimeTableScreen;
