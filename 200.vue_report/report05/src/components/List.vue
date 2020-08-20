<template>
  <div>
    <!-- 새로운 일기쓰기, 정렬, 검색 등 -->
    <div id="list-header">
      <div class="row">
        <div class="col-3 text-left">
          <button type="button" class="btn btn-success btn-sm" @click="moveToWrite">새로운 일기 쓰기</button>
        </div>
        <div class="col-9">
          <div class="row float-right">
            <select
              id="sorting-condition"
              ref="sortingcondition"
              @change="changeSortingCondition"
              style="margin-right:10px"
            >
              <option value="w0" selected>최신순</option>
              <option value="w1">오래된 순</option>
              <option value="t1">제목-오름차순</option>
              <option value="t0">제목-내림차순</option>
              <option value="c1">내용-오름차순</option>
              <option value="c0">내용-내림차순</option>
            </select>
            <input
              type="text"
              class="form-control-sm"
              placeholder="단어를 입력하세요"
              ref="inputkeyword"
              @keyup="changeKeyword"
              style="margin-right:5px"
            />
            <button type="button" class="btn btn-secondary btn-sm" @click="setInitial">정렬/검색 초기화</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 일기 리스트 -->
    <div id="list-wrapper">
      <!-- v-for 속성 element -->
      <div
        class="card"
        v-for="(diary, index) in diarylist"
        :key="diary.no"
        :class="{ active: mouseOverNum == diary.no }"
        @mouseover="changeMouseNum(diary.no)"
        @mouseleave="changeMouseNum(0)"
        :style="{ backgroundColor: getEvenColor(index) }"
      >
        <div class="card-body">
          <div class="row align-items-center">
            <div
              class="col-2"
              :style="{ marginRight: '30px', fontSize: '12px', color: 'gray' }"
            >{{ changeDateFmt(diary.writeat) }}</div>
            <div class="col-9 row align-items-center">
              <span class="diary-title" @click="getDetail(diary.no)">{{ diary.title }}</span>
            </div>
            <!-- MouseOver 삭제 버튼 보이기 -->
            <span class="float-right" v-show="mouseOverNum == diary.no">
              <button class="btn btn-danger btn-sm" @click="deleteDiary(diary.no)">삭제</button>
            </span>
          </div>
        </div>
      </div>
      <!-- diarylist 가 없을 경우, 보여줄 메세지 -->
      <div id="notExistDiaryMsg" class="row" v-show="diarylist.length == 0">
        <div class="col align-self-center">일기가 없습니다. 일기를 작성하세요.</div>
      </div>
      <!--'맨위로' 버튼:: scroll Y축이 150 내려갔을 경우, 맨위로 버튼 보이기 -->
      <div id="btn-to-top" v-show="windowTop > 150">
        <button @click="moveToTop" class="btn btn-warning btn-sm" style="color: white">TOP</button>
      </div>
    </div>
  </div>
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

      //검색어 - diary.title 기준
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
    // 짝수에 배경색 리턴하는 메소드
    getEvenColor(index) {
      // 홀수면 리턴
      if ((index + 1) % 2 !== 0) {
        return;
      }
      return "rgb(240, 240, 240)";
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

<style scoped>
#notExistDiaryMsg {
  width: 100%;
  height: 300px;
  font-size: 30px;
  color: gray;
}
.card {
  margin: 10px;
}
.diary-title {
  font-size: 17px;
  cursor: pointer;
}
.diary-title:hover {
  color: seagreen;
  font-weight: bold;
}
.active {
  background-color: rgb(236, 247, 234);
  border: 2px solid seagreen;
}
#btn-to-top {
  position: fixed;
  top: 20%;
  right: 3%;
}
</style>
