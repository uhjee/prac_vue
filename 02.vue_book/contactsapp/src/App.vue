<template>
  <!-- // 필요데이터 : currentView: 동적 컴포넌트로 보여줄 컴포넌트 지정 자식
// 컴포넌트들이필요로 하는 데이터를 data 옵션을 이용해 중앙집중화 하여 관리 및
  // props를 이용하여 자식 컴포넌트에게 뿌리기-->
  <div id="container">
    <div class="page-header">
      <h1 class="test-center">연락처 관리 App</h1>
      <p>(Dynamic Component + EventBus + Axios)</p>
    </div>
    <!-- v-binding 으로 props (contact) 전달 -->
    <component :is="currentView" :contact="contact"></component>
    <!-- contactlist component는 정적으로 구성 -->
    <contactList :contactlist="contactlist"></contactList>
    <!-- paginate component 는 정적으로 구성 -->
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
  </div>
</template>

<script>
import Vue from "vue";

import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";
import UpdatePhoto from "./components/UpdatePhoto";

import CONF from "./Config";
import eventBus from "./EventBus.js";
import Paginate from "vuejs-paginate";

export default {
  name: "app",
  components: {
    ContactList,
    AddContact,
    UpdateContact,
    UpdatePhoto,
    Paginate
  },
  data() {
    return {
      currentView: null,
      contact: { no: 0, name: "", tel: "", address: "", photo: "" },
      contactlist: {
        pageno: 1,
        // ./Congig.js 에 미리 작성해놓은 상수들 사용
        pagesize: CONF.PAGESIZE,
        totalcount: 0,
        contacts: []
      }
    };
  },
  // mounted
  // el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출됩니다. 루트 인스턴스가 문서 내의 엘리먼트에 마운트 되어 있으면, mounted가 호출 될 때 vm.$el도 문서 안에 있게 됩니다.
  //   virtual DOM의 생성 후 -- created는 virtual DOM 생성 전
  // 따라서 created는 data 옵션의 초기화, mounted는 virtual Dom의 조작 목적으로 사용할 수 있다
  mounted() {
    // 처음 실행되었을 때 첫 번째 페이지 데이터가 나타나도록 호출
    this.fetchContacts();

    eventBus.$on("cancel", () => {
      this.currentView = null;
    });
    eventBus.$on("addSubmit", contact => {
      this.currentView = null;
      this.addContact(contact);
    });
    eventBus.$on("updateSubmit", contact => {
      this.currentView = null;
      this.updateContact(contact);
    });
    eventBus.$on("addContactForm", () => {
      this.currentView = "addContact";
    });
    eventBus.$on("editContactForm", no => {
      this.fetchContactOne(no);
      this.currentView = "updateContact";
    });
    eventBus.$on("deleteContact", no => {
      this.deleteContact(no);
    });
    eventBus.$on("editPhoto", no => {
      this.fetchContactOne(no);
      this.currentView = "updatePhoto";
    });
    eventBus.$on("updatePhoto", (no, file) => {
      if (typeof file !== "undefined") {
        this.updatePhoto(no, file);
      }
      this.currentView = null;
    });
  },
  computed: {
    totalpage() {
      return (
        Math.floor(
          (this.contactlist.totalcount - 1) / this.contactlist.pagesize
        ) + 1
      );
    }
  },
  methods: {
    //   페이지 바꾸는 메소드 paginate에 바인딩
    pageChanged(page) {
      this.contactlist.pageno = page;
      this.fetchContacts();
    },
    fetchContacts() {
      this.$axios
        .get(CONF.FETCH, {
          params: {
            pageno: this.contactlist.pageno,
            pagesize: this.contactlist.pagesize
          }
        })
        .then(response => {
          this.contactlist = response.data;
        })
        .catch(ex => {
          console.log(`fetchContacts failed ${ex}`);
          this.contactlist.contacts = [];
        });
    },
    addContact: function(contact) {
      this.$axios
        .post(CONF.ADD, contact)
        .then(response => {
          this.contactlist.pageno = 1;
          this.fetchContacts();
        })
        .catch(ex => {
          console.log("addContact failed : ", ex);
        });
    },
    updateContact: function(contact) {
      this.$axios
        .put(CONF.UPDATE.replace("${no}", contact.no), contact)
        .then(response => {
          // 새로 화면 렌더링
          this.fetchContacts();
        })
        .catch(ex => {
          console.log("updateContact failed : ", ex);
        });
    },
    fetchContactOne: function(no) {
      this.$axios
        .get(CONF.FETCH_ONE.replace("${no}", no))
        .then(response => {
          this.contact = response.data;
        })
        .catch(ex => {
          console.log("fetchContactOne failed", ex);
        });
    },
    deleteContact: function(no) {
      this.$axios
        .delete(CONF.DELETE.replace("${no}", no))
        .then(response => {
          this.fetchContacts();
        })
        .catch(ex => {
          console.log("delete failed", ex);
        });
    },
    updatePhoto: function(no, file) {
      var data = new FormData();
      data.append("photo", file);
      this.$axios
        .post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
        .then(response => {
          this.fetchContacts();
        })
        .catch(ex => {
          console.log("updatePhoto failed", ex);
        });
    }
  },
  watch: {
    //   다른 페이지를 조회하다가 새로운 연락처를 추가하면, 방금 추가한 연락처를 확인할 수 있도록 첫번째 페이지로 이동해야한다.
    // paginate 에서 pageno를 바인딩하지 않고, ref 를 통해 직접 참조하여 수정한다.
    ["contactlist.pageno"]: function() {
      this.$refs.pagebuttons.selected = this.contactlist.pageno - 1;
    }
  }
};
</script>

<style scoped>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
