// 필요 데이터 : mode :: 쓰기 / 수정 여부
// 입력 폼, 수정 폼이 참조하는 컴포넌트
<template>
  <div class="modal">
    <!-- esc 키를 눌렀을 때 폼이 사라지도록 하기 위해 이벤트 등록 -->
    <div class="form" @keyup.esc="cancelEvent">
      <h3 class="heading">:: {{headingText}}</h3>
      <!-- data 옵션의 mode에 따라서 동적으로 화면 구성 -->
      <div v-if="mode=='update'" class="form-group">
        <label>일련번호</label>
        <input type="text" name="no" class="long" disabled v-model="contact.no" />
      </div>
      <div class="form-group">
        <label>이름</label>
        <!-- ref를 통한 직접 참조 -->
        <input
          type="text"
          name="name"
          class="long"
          v-model="contact.name"
          ref="name"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div class="form-group">
        <label>전화번호</label>
        <input type="text" name="tel" class="long" v-model="contact.tel" placeholder="전화번호를 입력하세요" />
      </div>
      <div class="form-group">
        <label>주 소</label>
        <input
          type="text"
          name="address"
          class="long"
          v-model="contact.address"
          placeholder="주소를 입력하세요"
        />
      </div>
      <div class="form-group">
        <div>&nbsp;</div>
        <input type="button" class="btn btn-primary" v-bind:value="btnText" @click="submitEvent()" />
        <input type="button" class="btn btn-primary" value="취 소" @click="cancelEvent()" />
      </div>
    </div>
  </div>
</template>

<script>
// import eventBus from "../EventBus";

import Constant from "../constant";
import { mapState } from "vuex";
import _ from "lodash";

export default {
  name: "contactForm",
  data() {
    return {
      mode: "add",
    };
  },
  props: ["no"],
  computed: _.extend(
    {
      btnText: function () {
        if (this.mode != "update") {
          return "추가";
        } else {
          return "수정";
        }
      },
      headingText: function () {
        if (this.mode != "update") {
          return "새로운 연락처 추가";
        } else {
          return "연락처 변경";
        }
      },
    },
    mapState({ contact: "contact", contactlist: "contactlist" })
  ),

  mounted() {
    //   DOM 객체에 직접참조하여 DOM API 사용
    this.$refs.name.focus();

    // 요청에 따라 초기 mode 설정
    let cr = this.$router.currentRoute;
    if (cr.fullPath.indexOf("/add") > -1) {
      this.mode = "add";
      this.$store.dispatch(Constant.INITIALIZE_CONTACT_ONE);
    } else {
      this.mode = "update";
      this.$store.dispatch(Constant.FETCH_CONTACT_ONE, { no: this.no });
    }
  },
  methods: {
    submitEvent() {
      if (this.mode == "update") {
        this.$store.dispatch(Constant.UPDATE_CONTACT);
        // 업데이트할 경우, 기존의 page 정보를 가지고 다시 contactslist 화면으로 네비게이션
        this.$router.push({
          name: "contacts",
          query: { page: this.contactlist.pageno },
        });
      } else {
        this.$store.dispatch(Constant.ADD_CONTACT);
        this.$router.push({
          name: "contacts",
          query: { page: 1 },
        });
      }
    },
    cancelEvent() {
      this.$router.push({
        name: "contacts",
        query: { page: this.contactlist.pageno },
      });
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.form {
  background-color: white;
  margin: 100px auto;
  max-width: 400px;
  min-width: 200px;
  font: 13px "verdana";
  padding: 10px 10px 10px 10px;
}
.form div {
  padding: 0;
  display: block;
  margin: 10px 0 0 0;
}
.form label {
  text-align: left;
  margin: 0 0 3px 0;
  padding: 0px;
  display: block;
  font-weight: bold;
}
.form input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}
.form .long {
  width: 100%;
}
.form .button {
  background: #2b798d;
  padding: 8px 15px 8px 15px;
  border: none;
  color: #fff;
}
.form .button:hover {
  background: #4691a4;
}
.form .heading {
  background: #33a17f;
  font-weight: 300;
  text-align: left;
  padding: 20px;
  color: #fff;
  margin: 5px 0 30px 0;
  padding: 10px;
  min-width: 200px;
  max-width: 400px;
}
</style>