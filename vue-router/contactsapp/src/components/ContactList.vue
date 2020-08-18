// 필요데이터: contactlist 연락처 목록 데이터
<template>
  <div>
    <p class="addnew">
      <!-- <button class="btn btn-primary" @click="addContact()">새 연락처 추가</button> -->
      <!-- 명명된 라우트를 이용해서 name이 addcontact인 URI로 이동시킨다. -->
      <router-link class="btn btn-primary" :to="{ name: 'addcontact' }"
        >새로운 연락처 추가하기</router-link
      >
    </p>
    <div id="example">
      <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>사진</th>
            <th>편집/삭제</th>
          </tr>
        </thead>
        <tbody id="contacts">
          <tr v-for="contact in contactlist.contacts" :key="contact.no">
            <td>{{ contact.name }}</td>
            <td>{{ contact.tel }}</td>
            <td>{{ contact.address }}</td>
            <td>
              <img
                class="thumbnail"
                :src="contact.photo"
                @click="editPhoto(contact.no)"
              />
            </td>
            <td>
              <button class="btn btn-primary" @click="editContact(contact.no)">
                편집
              </button>
              <button
                class="btn btn-primary"
                @click="deleteContact(contact.no)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <paginate
      ref="pagebuttons"
      :page-count="totalpage"
      :page-range="7"
      :margin-pages="3"
      :click-handler="pageChanged"
      :prev-text="'이전'"
      :next-text="'다음'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>
    <!-- 하위 라우터가 표시될 곳-------------------- -->
    <router-view></router-view>
  </div>
</template>

<script>
// import eventBus from "../EventBus";
import Constant from "../constant";
import { mapState } from "vuex";
import Paginate from "vuejs-paginate";
import _ from "lodash";

export default {
  name: "contactList",
  components: { Paginate },
  computed: _.extend(
    {
      totalpage() {
        let totalcount = this.contactlist.totalcount;
        let pagesize = this.contactlist.pagesize;
        return Math.floor((totalcount - 1) / pagesize) + 1;
      }
    },
    mapState({
      contactlist: "contactlist"
    })
  ),
  mounted() {
    // 컴포넌트가 마운트되어 활성화될 때 실행
    // 이후 페이지를 변경하더라도 컴포넌트가 새롭게 마운트되지 않고, 단지 라우트 경로만 변경될 뿐
    // 그렇기 때문에 아래에 watch 속성 존재

    // 기본 page 는 1
    let page = 1;
    // 만약 요청에 page가 있다면,
    if (this.$route.query && this.$route.query.page) {
      page = parseInt(this.$route.query.page);
    }
    // 페이지를 읽어오는  action 호출
    this.$store.dispatch(Constant.FETCH_CONTACTS, { pageno: page });
    this.$refs.pagebuttons.selected = page - 1;
  },
  watch: {
    // 네비게이션할 경우 page 정보 전달
    $route: function(to, from) {
      if (to.query.page && to.query.page != this.contactlist.pageno) {
        let page = to.query.page;
        this.$store.dispatch(Constant.FETCH_CONTACTS, { pageno: page });
        this.$refs.pagebuttons.selected = page - 1;
      }
    }
  },

  methods: {
    pageChanged(page) {
      this.$router.push({ name: "contacts", query: { page: page } });
    },
    editContact(no) {
      // contacts/update/:no 로 이동
      this.$router.push({ name: "updatecontact", params: { no: no } });
    },
    deleteContact(no) {
      if (confirm(`${no}번 데이터를 정말로 삭제하시겠습니까?`) == true) {
        this.$store.dispatch(Constant.DELETE_CONTACT, { no: no });
        this.$router.push({ name: "contacts" });
      }
    },
    editPhoto(no) {
      // contacts/photo/:no 로 이동
      this.$router.push({ name: "updatePhoto", params: { no: no } });
    }
  }
};
</script>

<style scoped>
.addnew {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 40px 0px 0px 0px;
  text-align: left;
}
#example {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 0px;
  position: relative;
  font: 13px "verdana";
}
#example .long {
  width: 100%;
}
#example .short {
  width: 50%;
}
#example input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}
#list {
  width: 800px;
  font: 13px "verdana";
}
#list thead tr {
  color: yellow;
  background-color: purple;
}
#list th:nth-child(5n + 1),
#list td:nth-child(5n + 1) {
  width: 200px;
}
#list th:nth-child(5n + 2),
#list td:nth-child(5n + 2) {
  width: 150px;
}
#list th:nth-child(5n + 3),
#list td:nth-child(5n + 3) {
  width: 250px;
}
#list th:nth-child(5n + 4),
#list td:nth-child(5n + 4) {
  width: 60px;
}
#list th:nth-child(5n),
#list td:nth-child(5n) {
  width: 150px;
}
#list th {
  padding: 10px 5px 10px 5px;
}
#list tr {
  border-bottom: solid 1px black;
}
#list td,
#list th {
  text-align: center;
  vertical-align: middle;
}
img.thumbnail {
  width: 48px;
  height: 48px;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  cursor: pointer;
}
</style>
