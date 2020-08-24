<template>
  <el-container>
    <el-header>
      <el-row style="display:flex; align-items:center">
        <el-col :span="4">
          <el-button type="success" icon="el-icon-edit" @click="moveToWrite">일기 쓰기</el-button>
        </el-col>
        <el-col :span="12">
          <el-select v-model="sorting.sortingField" placeholder="정렬">
            <el-option label="작성일" value="writeat"></el-option>
            <el-option label="내 용" value="content"></el-option>
            <el-option label="제 목" value="title"></el-option>
          </el-select>
          <el-switch v-model="sorting.soringOrder" active-text="오름차순" inactive-text="내림차순"></el-switch>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="검색어를 입력해주세요" v-model="keyword">
            <!-- TODO: placeholder가 나오지 않는다.. -->
            <!-- <el-select v-model="select" slot="prepend" placeholder="Select">
              <el-option label="제 목" value="title"></el-option>
              <el-option label="내 용" value="content"></el-option>
              <el-option label="날 짜" value="writeat"></el-option>
            </el-select>-->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-table
            :data="diarylist"
            border
            stripe
            style="width: 100%"
            @cell-mouse-enter="handleMouseOver"
            @cell-mouse-leave="handleMouseOver"
          >
            <el-table-column prop="writeat" label="Date" :formatter="dateFormatter" width="180"></el-table-column>
            <!-- customizing column : template로 내부를 세부 조정  -->
            <!-- 내부에서는 prop으로 row 등을  상속받아 사용 -->
            <el-table-column prop˝="title" label="Title">
              <template slot-scope="scope">
                <span
                  class="diary-title"
                  style="margin-left: 10px"
                  @click="getDetail(scope.row.no)"
                >{{scope.row.title}}</span>
                <span
                  class="float-right"
                  v-show="mouseOverNum == scope.row.no"
                  style="margin-right: 10px"
                >
                  <el-button
                    size="mini"
                    @click="deleteDiary(scope.row.no)"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="writer" label="Writer" width="100"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
// 날짜 관련 모듈 import
import DateUtil from "../dateutil";

export default {
  name: "listtable",
  data() {
    return {
      //scroll 좌표 담을 property - 맨위로 버튼 v-show 조건
      windowTop: 0,

      // 마우스오버 시 해당하는 diary의 no를 담는 property
      mouseOverNum: 0,

      //검색어 - title, content, date 기준
      select: "",

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
    //   el-column의 attribute formater 사용 :: Data format 변환
    dateFormatter(row, column) {
      return DateUtil.convertKoreanFmt(row.writeat);
    },
    // window 객체에 'scroll' 이벤트 핸들러
    onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
    // el-table에서 제공하는 event (cell-mouse-enter , leave)의 핸들러
    handleMouseOver(row, column, cell, event) {
      if (event.type == "mouseenter") {
        this.mouseOverNum = row.no;
        // 나머지는 mouseleave인 경우. data의 mouseOverNum 초기화
      } else {
        this.mouseOverNum = 0;
      }
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
      this.$router.push({
        name: "write",
      });
    },
    deleteDiary(no) {
      if (confirm("정말로 삭제하시겠어요?")) {
        this.$store.dispatch("deleteDiary", { no: no });
        alert("삭제되었습니다.");
      }
    },
    // 날짜 포맷 변환하는 메소드 (yyyy년 MM월 dd일)
    changeDateFmt(dateString) {
      return DateUtil.convertKoreanFmt(dateString);
    },
    // 검색어 변경하는 메소드
    changeKeyword() {
      this.keyword = this.$refs.inputkeyword.value;
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

<style>
.diary-title {
  font-size: 16px;
  cursor: pointer;
}
.diary-title:hover {
  color: seagreen;
  font-weight: bold;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>