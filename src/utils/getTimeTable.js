import domino from 'domino';
import {TextDecoder} from 'text-encoding';
const decoder = new TextDecoder('gb2312');

const courseRegex = /<td align="Center" rowspan="\d+".*?>(.*?)<\/td>/g;
let html;
let useInformation;
export const getTimeTable = async () => {
  return fetch(
    'http://jwxt.njupt.edu.cn/xskbcx.aspx?xh=B22050106&xm=%B2%B7%C7%EC%F6%CE&gnmkdm=N121603',
    {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9',
        'upgrade-insecure-requests': '1',
        cookie:
          'Pg9zLpq2aFPgS=60MJCmud_EtNcYtffj2.nPBSNo6w1bi5Her3Yn0CLlKLXKr2EG6wZ1foq6D.nR0jYnw.h27H_FuE5cFY58zltYqq; ASP.NET_SessionId=feduz5u202zr4hb22jcpwc55; Pg9zLpq2aFPgT=088h_FX6WwC8w_LL1ehcRcx3DYP5PeXjGe7mJEnjVF_HdpdXlpkEvIHH2UecYPQMirFhdkSYkSGaYVjbIW62H0114t1b0KJ0qkce2miAPK5HonS5Ey_rNkF40RDiFIm9AX_HQ5xF6zVz5YrqeZhPcn6HUHdgrTO7DD1rXfJbnYJ9AQP4JbzB5PsH.mo.T2dFajOSRe9PylR2TX4sxeP3gO3P6vXCyI3rfaiW6agi7zrIleAfNsCDaaqoTVdMqjFH5fgeETlpNQMMH.n.Wb5NgkbaIHsB1G_mKhVbg2dA6KpitCt5VHU.ZeGDAJn1Mwn2iv3B2ZcFXH7Efx0btlsNgko1FeFXD6MLxNpN_UzUvLzhSRnLYraDEMG2XwoHf_e2imlnlkIqaZtLGowrSbMyLB0xG_g_O_mqjvgld5XtCVAQ',
        Referer: 'http://jwxt.njupt.edu.cn/xs_main.aspx?xh=B22050106&type=1',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      body: null,
      method: 'GET',
    },
  )
    .then(response => {
      // console.log(response);
      return response.arrayBuffer();
    })
    .then(buffer => {
      html = decoder.decode(buffer);

      // console.log(html);

      const window = domino.createWindow(html);
      const doc = window.document;

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
            courceItems.push(courceItem);
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

      useInformation = getUsefulTimeInformation(transformedData);

      return useInformation;
    })
    .catch(error => {
      console.log('fetch error', error);
    });
};

function getUsefulTimeInformation(scheduleData) {
  const formattedSchedule = [];

  scheduleData.forEach(item => {
    const dayOfWeek = item.time.match(/周(.)第/)[1]; // Extract day of the week
    const classTime = item.time.match(/第([\d,]+)节/);
    const duration = item.time.match(/{第(\d+-\d+)周/)[1]; // Extract duration
    // const weekState = item.time.match(/([双单])周/) || 'all';

    let weekState = 'all';

    const courseName = item.content;
    const teacher = item.teacher;
    const location = item.where;

    if (item.time.match(/([双单])周/)) {
      weekState = item.time.match(/([双单])周/)[1];
    }

    // console.log(courseName, weekState);

    const formattedItem = {
      dayOfWeek,
      classTime,
      duration,
      weekState,
      courseName,
      teacher,
      location,
    };

    formattedSchedule.push(formattedItem);
  });

  return formattedSchedule;
}
