export default {
  // { yyyy.MM.dd } format 으로 오늘 날짜 출력하는 함수
  getTodayDate: () => {
    let date = new Date();
    let year = date.getFullYear(); // yyyy
    let month = (1 + date.getMonth()); // M
    month = month >= 10 ? month : `0${month}`; // MM 두자리 출력
    let day = date.getDate(); //d
    day = day >= 10 ? day : `0${day}`; // dd 두자리 출력
    return `${year}.${month}.${day}`;
  },

  //   dateString to Date({ yyyy.MM.dd })
  convertDateFormat: (dateString) => {
    let date = new Date(dateString)
    let year = date.getFullYear(); // yyyy
    let month = (1 + date.getMonth()); // M
    month = month >= 10 ? month : `0${month}`; // MM 두자리 출력
    let day = date.getDate(); //d
    day = day >= 10 ? day : `0${day}`; // dd 두자리 출력
    return `${year}.${month}.${day}`;
  }
}
