export default class Utils {
  static formatDate(data: string) {
    let arr_date = data.split('/');

    let formatstring = arr_date[1] + '-' + arr_date[0] + '-' + arr_date[2];

    var newDate = new Date(formatstring);

    return newDate;
  }
}
