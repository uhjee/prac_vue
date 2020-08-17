<template>
  <div>
    <hr class="divider" />
    <div>
      <table class="detail table table-bordered">
        <tbody>
          <tr class="active">
            <td>일렬번호</td>
            <td>{{contact.no}}</td>
          </tr>
          <tr class="active">
            <td>이 름</td>
            <td>{{contact.name}}</td>
          </tr>
          <tr class="active">
            <td>전화</td>
            <td>{{contact.tel}}</td>
          </tr>
          <tr class="active">
            <td>주소</td>
            <td>{{contact.address}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import contactlist from "../ContactList";

export default {
  name: "contactbyno",
  data() {
    return {
      no: 0,
      contacts: contactlist.contacts,
    };
  },
  //   호출될 때마다 Vue Instance 생성..
  created() {
    //   /contacts/:no 의 :no 위치의 문자열 값 획득 및 데이터에 할당
    //    /users?keyword=test 와 같은 쿼리스트링으로 요청할 경우 query 객체 이용
    // ==>  this.$route.query.[keyword] 와 같이 코드 작성
    this.no = this.$route.params.no;
  },
  watch: {
    //   to: 현재의 라우트 객체 / from: 이전의 라우트 객체
    $route: function (to, from) {
      this.no = to.params.no;
    },
  },
  //   Getter 느낌.. Vue Instance 가 created 될 때 담아온 파라미터와 일치하는 값 리턴
  computed: {
    contact() {
      var no = this.no;
      //   contacts 에서 요청받은 route의 no와 같은 객체 뽑아내기
      var arr = this.contacts.filter((item, index) => {
        //   다음 조건식에 해당하는 객체만 배열 형태로 리턴
        return item.no == no;
      });
      if (arr.length == 1) {
        return arr[0];
      } else {
        return {};
      }
    },
  },
};
</script>

<style>
table.detail {
  width: 400px;
}
.divider {
  height: 3px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ff0066;
  color: #ff0066;
  border: 0 none;
}
</style>