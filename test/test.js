const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {TextDecoder} = require('text-encoding');
const decoder = new TextDecoder('gb2312');

const courseRegex = /<td align="Center" rowspan="\d+".*?>(.*?)<\/td>/g;
let html;
let useInformation;
const getTimeTable = () => {
  fetch(
    'http://jwxt.njupt.edu.cn/xskbcx.aspx?xh=B22050106&xm=%B2%B7%C7%EC%F6%CE&gnmkdm=N121603',
    {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en,zh-CN;q=0.9,zh;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'cache-control': 'max-age=0',
        'upgrade-insecure-requests': '1',
        cookie:
          'Pg9zLpq2aFPgS=60MJCmud_EtNcYtffj2.nPBSNo6w1bi5Her3Yn0CLlKLXKr2EG6wZ1foq6D.nR0jYnw.h27H_FuE5cFY58zltYqq; ASP.NET_SessionId=ge0usj45yplpm0yp2githkb2; Pg9zLpq2aFPgT=0ZnqjytbUcrAH.Rjj4ta02DPWGAbzWdnyNKcbN4.LzUi3ECP17yJQ8AeF6fUdy4zt33AbzVRSwKSbw3ruJ1GsITfaItJDMfxDo2ItbhV5s7Z4Qe64.sSiSlJ3GjPHWvJiYPcgSOb2OM30imF5cOE8bhvi5qU9A_AHEWlFZOXT5sWAxeLQ0kmaqjHzWd1x7VfRd1HK1GNpzXPa8ieJBtlLoi9MP9v5uf.srmRetT_G5zNzi2woSGr4DvUQe7OmYTj05kJ4ZwcvrIgSqbXWH1TV.FgfDKohWY.LseSmB1HumJRmUwedifVHGv7RlxY0O_ZRjqjVnyZcJ.eKpUKln93IDKZu3rTt_nJEIpisnAmzG_PIvAKUa77p89KtE3W5WNnhMCeEeUetY6iOL5_oPnhwClHRnKG5K_3Hv9L9mQa2fV7',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
    },
  )
    .then(response => response.arrayBuffer())
    .then(buffer => {
      html = decoder.decode(buffer);

      console.log(html);

      const dom = new JSDOM(html);

      const doc = dom.window.document;
      const studentInfo = {};
      studentInfo['学号'] = doc
        .querySelector('#Label5')
        .textContent.split('：')[1];
      studentInfo['姓名'] = doc
        .querySelector('#Label6')
        .textContent.split('：')[1];
      studentInfo['学院'] = doc
        .querySelector('#Label7')
        .textContent.split('：')[1];
      studentInfo['专业'] = doc
        .querySelector('#Label8')
        .textContent.split('：')[1];
      studentInfo['行政班'] = doc
        .querySelector('#Label9')
        .textContent.split('：')[1];

      // Extract class schedule
      const courses = [];
      const table = doc.querySelector('#Table1');
      const rows = table.querySelectorAll('tr');

      for (let i = 2; i < rows.length; i++) {
        const htmlString = rows[i].innerHTML;

        const courseMatches = htmlString.matchAll(courseRegex);

        const extractedCourses = [...courseMatches].map(match => match[1]);

        courses.push(...extractedCourses);
      }

      const courceItems = [];
      courses.map(item => {
        let courceItem = [];
        item.split('<br>').map(itemitem => {
          itemitem !== '' && courceItem.push(itemitem);
          if (itemitem === '') {
            courceItem.push(courceItem);
            courceItem = [];
          }
        });
        courceItems.push(courceItem);
      });

      const transformedData = courceItems.map(item => ({
        content: item[0],
        time: item[1],
        teacher: item[2],
        where: item[3],
      }));

      console.log(studentInfo);
      console.log(getUsefulTimeInformation(transformedData));
      useInformation = getUsefulTimeInformation(transformedData);
    });

  return useInformation;
};

function getUsefulTimeInformation(scheduleData) {
  const formattedSchedule = [];

  scheduleData.forEach(item => {
    const dayOfWeek = item.time.match(/周(.)第/)[1]; // Extract day of the week
    const classTime = item.time.match(/第([\d,]+)节/);
    const duration = item.time.match(/{第(\d+-\d+)周/)[1]; // Extract duration

    const courseName = item.content;
    const teacher = item.teacher;
    const location = item.where;

    const formattedItem = {
      dayOfWeek,
      classTime,
      duration,
      courseName,
      teacher,
      location,
    };

    formattedSchedule.push(formattedItem);
  });

  return formattedSchedule;
}

getTimeTable();
