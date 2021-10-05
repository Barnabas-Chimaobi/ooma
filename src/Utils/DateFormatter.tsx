import moment from 'moment';

export default class DateFormatter {
  static date1 = (date: any) => moment(date).format('YYYY-MM-DD');

  static date2 = (date: any) => date && new Date(date).toDateString();

  static date3 = (date: any) => moment(date).format('YYYY/MM/DD');

  static date4 = (date: any) => moment(date).format('DD/MM/YYYY');

  static date5 = (date: any) => moment(date).format('DD-MM-YYYY HH:mm');

  static date6 = (date: any) => moment(date).format('DD-MM-YYYY HH:mm:ss');

  static LocaleDateString = () => {
    const date = new Date();
    return moment(date).format('DD/MM/YYYY');
  };

  static UTCStringDate = () => new Date().toDateString();

  static date7 = (date: any) => moment(date).format('YYYY-MM-DD HH:mm:ss');

  static dateFormatter = (date: any) => {
    const dater = DateFormatter.date2(date);
    const monthNum = dater.substr(3, 2);
    const year = dater.substr(6, 4);
    let month;

    switch (monthNum) {
      case '01':
        month = 'January';
        break;

      case '02':
        month = 'February';
        break;

      case '03':
        month = 'March';
        break;

      case '04':
        month = 'April';
        break;

      case '05':
        month = 'May';
        break;

      case '06':
        month = 'June';
        break;

      case '07':
        month = 'July';
        break;

      case '08':
        month = 'August';
        break;

      case '09':
        month = 'September';
        break;

      case '10':
        month = 'October';
        break;

      case '11':
        month = 'November';
        break;

      case '12':
        month = 'December';
        break;

      default:
        break;
    }
    return `${month}, ${year}`;
  };

  static yesterday = moment().subtract(1, 'days');

  static formatAMPM = (date: any) => {
    date = new Date(new Date(date).getTime() - 60 * 60000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };
}
