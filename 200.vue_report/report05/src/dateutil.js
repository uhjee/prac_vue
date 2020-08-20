export default {
  // 오늘 날짜를 'yyyy년 MM월 dd일'로 리턴하는 함수
  convertKoreanFmt: (dateString) => {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    month = month >= 10 ? month : `0${month}` //03, 05 두자리로 월 출력
    day = day >= 10 ? day : `0${day}`; //01, 02 두자리로 일 출력
    return `${year}년 ${month}월 ${day}일`;
  },

  convertDetailFmt: (dateString) => {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    month = month >= 10 ? month : `0${month}` //03, 05 두자리로 월 출력
    day = day >= 10 ? day : `0${day}`; //01, 02 두자리로 일 출력
    hour = hour >= 10 ? hour : `0${hour}`; //01, 02 두자리로 일 출력
    minute = minute >= 10 ? minute : `0${minute}`; //01, 02 두자리로 일 출력
    return `${year}. ${month}. ${day} ${hour}:${minute}`;
  }
}
