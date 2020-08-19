export default {
  // 오늘 날짜를 'yyyy년 MM월 dd일'로 리턴하는 함수
  getTodayDate: () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    month = month >= 10 ? month : `0${month}` //03, 05 두자리로 월 출력
    day = day >= 10 ? day : `0${day}`; //01, 02 두자리로 일 출력
    return `${year}년 ${month}월 ${day}일`;
  }
}
