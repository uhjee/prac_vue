<template>
  <el-container class="list-container">
    <el-header class="list-header">
      <el-button-group class="btn-group-view margin-right-10">
        <el-button
          icon="el-icon-tickets"
          :class="{ 'btn-color': listmode == 'timeline' }"
          @click="changeListMode('timeline')"
        ></el-button>
        <el-button
          icon="el-icon-menu"
          :class="{ 'btn-color': listmode == 'card' }"
          @click="changeListMode('card')"
        ></el-button>
      </el-button-group>
      <el-button icon="el-icon-edit" @click="moveToWrite" circle class="btn-color margin-right-10"></el-button>
      <el-select
        claass="input-sorting margin-right-10"
        v-model="sorting.sortingField"
        placeholder="정렬"
      >
        <el-option label="작성일" value="writeat"></el-option>
        <el-option label="내 용" value="content"></el-option>
        <el-option label="제 목" value="title"></el-option>
      </el-select>
      <el-switch
        class="margin-right-10"
        v-model="sorting.soringOrder"
        active-text="오름차순"
        inactive-text="내림차순"
      ></el-switch>
      <el-input
        class="input-search-keyword"
        placeholder="검색어를 입력해주세요"
        v-model="inputKeyword"
        @keydown.enter.native="changeKeyword"
        clearable
      >
        <!-- TODO: placeholder가 나오지 않는다.. -->
        <!-- <el-select v-model="select" slot="prepend" placeholder="Select">
              <el-option label="제 목" value="title"></el-option>
              <el-option label="내 용" value="content"></el-option>
              <el-option label="날 짜" value="writeat"></el-option>
        </el-select>-->
        <template slot="prepend">
          <i class="el-icon-search"></i>
        </template>
      </el-input>
    </el-header>
    <!-- listmode가 timeline일 때 ------------------------------------------ -->
    <el-main class="list-main" v-if="listmode== 'timeline'">
      <el-timeline>
        <el-timeline-item
          v-for="diary in diarylist"
          :key="diary.no"
          :timestamp="changeKoreanDateFmt(diary.writeat)"
          placement="top"
        >
          <el-card :class="{ active: mouseOverNum == diary.no }">
            <div
              class="card-body"
              @mouseover="changeMouseNum(diary.no)"
              @mouseleave="changeMouseNum(0)"
            >
              <div v-show="mouseOverNum == diary.no">
                <el-popconfirm
                  confirmButtonText="네"
                  cancelButtonText="아니에요"
                  confirmButtonType="danger"
                  cancelButtonType="plain"
                  icon="el-icon-info"
                  iconColor="red"
                  title="정말 삭제하실 건가요?"
                  @onConfirm="deleteDiary(diary.no)"
                >
                  <el-button
                    class="btn-delete-diary"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </div>
              <h4 class="timeline-card-title" @click="getDetail(diary.no)">{{diary.title}}</h4>
              <p class="timeline-card-writeat">{{changeKoreanDetailDateFmt(diary.writeat)}} 작성</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-main>

    <!-- listmode가 card일 때 ------------------------------------------ -->
    <el-main class="list-main" v-if="listmode == 'card'">
      <div class="card-row">
        <el-card
          :class="{ active: mouseOverNum == diary.no }"
          v-for="diary in diarylist"
          :key="diary.no"
        >
          <div class="card-box">
            <div
              class="card-body"
              @mouseover="changeMouseNum(diary.no)"
              @mouseleave="changeMouseNum(0)"
            >
              <div v-show="mouseOverNum == diary.no">
                <el-popconfirm
                  confirmButtonText="네"
                  cancelButtonText="아니에요"
                  confirmButtonType="danger"
                  cancelButtonType="plain"
                  icon="el-icon-info"
                  iconColor="red"
                  title="정말 삭제하실 건가요?"
                  @onConfirm="deleteDiary(diary.no)"
                >
                  <el-button
                    class="btn-delete-diary"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </div>
              <div class="card-card-writeat margin-bottom-10">{{changeKoreanDateFmt(diary.writeat)}}</div>
              <div
                class="card-card-title margin-bottom-20"
                @click="getDetail(diary.no)"
              >{{diary.title}}</div>
              <div class="card-card-content margin-left-20">{{diary.content}}</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
// 날짜 관련 모듈 import
import DateUtil from "../dateutil";

export default {
  name: "list",
  data() {
    return {
      //scroll 좌표 담을 property - 맨위로 버튼 v-show 조건
      windowTop: 0,

      // 마우스오버 시 해당하는 diary의 no를 담는 property
      mouseOverNum: 0,

      //input 태그와 바인딩된 검색어 - diary.title 기준
      inputKeyword: "",
      //  state와 바인팅된 검색어
      keyword: "",

      // 정렬
      sorting: {
        // 정렬기준
        // default : 작성일자
        sortingField: "writeat",
        // 내림차순 -> false / 오름차순 -> true
        soringOrder: false,
      },
    };
  },
  //life cycle hook- mounted :: DOM 요소(scroll)에 이벤트 걸기 위해 사용
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  //life cycle hook - beforeDestroy :: DOM 요소(scroll)에 걸어두었던 이벤트 제거
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  // computed: mapState(["diarylist"]),
  //    ==> mapState보다 아래처럼 사용
  computed: {
    listmode() {
      return this.$store.state.listmode;
    },
    // v-for로 뿌려줄 array
    diarylist() {
      // includes() 검색어 :: data의 keyword를 parameter로 사용
      // filter() 정렬 :: data의 sorting을 parameter로 사용
      return this.$store.state.diarylist
        .filter((d) => d.title.includes(this.keyword))
        .sort((a, b) => {
          // data의 sorting 에 따른 분기처리..
          // TODO: 정리...
          if (this.sorting.sortingField == "writeat") {
            if (this.sorting.soringOrder == false) {
              return (
                new Date(b[this.sorting.sortingField]) -
                new Date(a[this.sorting.sortingField])
              );
            } else {
              return (
                new Date(a[this.sorting.sortingField]) -
                new Date(b[this.sorting.sortingField])
              );
            }
          } else if (this.sorting.sortingField == "title") {
            if (this.sorting.soringOrder == false) {
              return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
            } else {
              return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            }
          } else if (this.sorting.sortingField == "content") {
            if (this.sorting.soringOrder == false) {
              return a.content > b.content ? -1 : a.content < b.content ? 1 : 0;
            } else {
              return a.content < b.content ? -1 : a.content > b.content ? 1 : 0;
            }
          }
        });
    },
  },
  methods: {
    changeListMode(listmode) {
      console.log(listmode);
      this.$store.dispatch("changeListMode", { listmode: listmode });
    },
    // window 객체에 'scroll' 이벤트 핸들러
    onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
    // v-for 개별 인덱스마다 mouseover 이벤트를 걸기 위한 메소드
    changeMouseNum(no) {
      this.mouseOverNum = no;
    },
    // 상세보기 라우팅
    getDetail(no) {
      this.$router.push({
        name: "detail",
        // params로 전달하면, 전달받는 컴포넌트 내부에서 props로 받을 수 있다.
        params: {
          no: no,
        },
      });
    },
    // 새로운 다이어리 추가하는 화면으로 라우팅
    moveToWrite() {
      this.$store.dispatch("changeFormMode", {
        formmode: "write",
      });
      this.$router.push({
        name: "write",
      });
    },
    deleteDiary(no) {
      this.$store.dispatch("deleteDiary", { no: no });
      this.$message({
        type: "info",
        message: `${no}번 일기가 삭제되었어요.`,
      });
    },
    // 검색어 변경하는 메소드
    changeKeyword() {
      console.log(this.inputKeyword);
      this.keyword = this.inputKeyword;
    },
    // 정렬, 검색 초기화 메소드
    setInitial() {
      // Dom element 초기화
      this.$refs.inputkeyword.value = "";
      this.$refs.sortingcondition.selectedIndex = 0;
      // data() 초기화
      this.keyword = "";
      this.sorting.sortingField = "writeat";
      this.sorting.soringOrder = false;
    },
    // 정렬기준을 바꾸는 메소드
    changeSortingCondition() {
      // select element의 첫글자
      //      t -> title 기준
      if (this.$refs.sortingcondition.value[0] == "t") {
        this.sorting.sortingField = "title";
        //      c -> content 기준
      } else if (this.$refs.sortingcondition.value[0] == "c") {
        this.sorting.sortingField = "content";
        //      n -> no 기준
      } else if (this.$refs.sortingcondition.value[0] == "w") {
        this.sorting.sortingField = "writeat";
      }

      // select element의 두번째 글자가 0 -> 내림차순 : false
      // select element의 두번째 글자가 1 -> 오름차순 : true
      if (this.$refs.sortingcondition.value[1] == "0") {
        this.sorting.soringOrder = false;
      } else {
        this.sorting.soringOrder = true;
      }
    },
    // 날짜 포맷 변환하는 메소드 (yyyy년 MM월 dd일)
    changeKoreanDateFmt(dateString) {
      return DateUtil.convertKoreanFmt(dateString);
    },
    // 날짜 포맷 변환하는 메소드 (yyyy년 MM월 dd일 오후(오전) HH시 mm분)
    changeKoreanDetailDateFmt(dateString) {
      return DateUtil.convertKoreanDetailFmt(dateString);
    },
    // 맨위로 가기 버튼
    moveToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.list-header {
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(202, 202, 202);
  margin-bottom: 20px;
}
.list-main {
  height: 100vh;
}
.el-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.btn-group-view .el-button {
  color: tomato;
  border: 1px solid #fc7375;
}
.btn-group-view .el-button:hover {
  background-color: #fc7375;
  color: white;
}
.el-button.btn-color {
  background-color: #fc7375;
  color: white;
  border: 1px solid #f8b4b5;
}
.el-header .el-select {
  width: 15%;
}
.el-header .input-search-keyword {
  float: right;
  /* justify-self: flex-end; */
  width: 30%;
}
.el-timeline .el-card {
  height: 130px;
  margin-bottom: 25px;
}
.timeline-card-title {
  font-size: 18px;
  color: rgb(100, 93, 93);
  cursor: pointer;
  /* float: left; */
}
.timeline-card-title:hover {
  font-weight: bold;
  color: tomato;
}
.timeline-card-writeat {
  font-size: 13px;
  color: tomato;
  /* float: left; */
}
.el-card .btn-delete-diary {
  float: right;
}
.card-row .el-card {
  box-sizing: border-box;
  height: 180px;
  width: 280px;
  margin: 15px 10px;
  display: inline-block;
}
div.card-box {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.card-row .card-body {
  padding: 0;
  margin: 0;
}
.el-card .card-card-writeat {
  font-size: 16px;
  color: #fc7375;
}
.el-card .card-card-title {
  height: 30px;
  font-size: 18px;
  color: rgb(95, 86, 86);
  font-weight: bold;
  cursor: pointer;
  /* multiline overflow .. chrome 및 safari 에서만 동작.. cross-browsing */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.el-card .card-card-title:hover {
  font-weight: bold;
  color: tomato;
}
.el-card .card-card-content {
  height: 40px;
  font-size: 13px;
  color: gray;
  /* multiline overflow .. chrome 및 safari 에서만 동작.. cross-browsing */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.active {
  border: 2px solid rgb(245, 95, 95);
}
.margin-right-10 {
  margin-right: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-bottom-20 {
  margin-bottom: 15px;
}
.margin-left-20 {
  margin-left: 10px;
}
</style>
