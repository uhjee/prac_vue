// 상수 처리 ... 대문자 표기
const BASE_URL = '/api';

export default {
  // 한 페이지에 보여줄 page size
  PAGESIZE: 5,

  //   사용하려는 API에 맞추어 작성----------------------
  FETCH: `${BASE_URL}/contacts`,
  ADD: `${BASE_URL}/contacts`,
  UPDATE: `${BASE_URL}/contacts/${no}`,
  FETCH_ONE: `${BASE_URL}/contacts/${no}`,
  DELETE: `${BASE_URL}/contacts/${no}`,
  UPDATE_PHOTO: `${BASE_URL}/contacts/${no}/photo`,


}
