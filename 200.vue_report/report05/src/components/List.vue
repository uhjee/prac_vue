<template>
  <div>
    <div id="list-header">
      <div class="row">
        <div class="col-4 text-left">
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="moveToWrite"
          >
            새로운 일기 쓰기
          </button>
        </div>
        <div class="col-8">
          <div class="float-right">
            <select
              id="sorting-condition"
              ref="sortingcondition"
              @change="changeSortingCondition"
            >
              <option value="n0" selected>최신순</option>
              <option value="n1">오래된 순</option>
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
            />
            <button
              type="button"
              class="btn btn-secondary btn-sm "
              @click="setInitial"
            >
              정렬/검색 초기화
            </button>
          </div>
        </div>
      </div>
      <!-- todo!!!! 정렬 검색기능 -->
    </div>
    <div id="list-wrapper">
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
          <div class="row">
            <div
              class="col-2"
              :style="{ marginRight: '30px', fontSize: '12px', color: 'gray' }"
            >
              {{ diary.writeat }}
            </div>
            <div class="col-9">
              <span class="diary-title" @click="getDetail(diary.no)">
                {{ diary.title }}
              </span>
              <!-- MouseOver 삭제 버튼 보이기 -->
              <span v-show="mouseOverNum == diary.no">
                <button
                  class="btn btn-danger btn-sm float-right"
                  @click="deleteDiary(diary.no)"
                >
                  삭제
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="notExistDiaryMsg" class="row" v-show="diarylist.length == 0">
        <div class="col align-self-center">
          일기가 없습니다. 일기를 작성하세요.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "list",
  data() {
    return {
      // 마우스오버 시 해당 diary.no을 담아온다
      mouseOverNum: 0,
      //검색어 - title
      keyword: "",
      // 정렬
      sorting: {
        // 정렬기준 - diary의 properties 중 no, title
        sortingField: "no",
        // 내림차순 -> false  오름차순 -> true..
        soringOrder: false
      }
    };
  },
  //   Todo 나중에 getter로 바꿔서 해당 유저의 글만 가져오자 + 정렬 검색
  // computed: mapState(["diarylist"]),
  computed: {
    diarylist() {
      // includes() 검색어 :: data의 keyword를 parameter로 사용
      // filter() 정렬 :: data의 sorting을 parameter로 사용
      return this.$store.state.diarylist
        .filter(d => d.title.includes(this.keyword))
        .sort((a, b) => {
          // sorting == false  :: 내림차순
          if (this.sorting.sortingField == "no") {
            if (this.sorting.soringOrder == false) {
              return (
                b[this.sorting.sortingField] - a[this.sorting.sortingField]
              );
            } else {
              return (
                a[this.sorting.sortingField] - b[this.sorting.sortingField]
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
    }
  },
  methods: {
    // 자세히 보기 라우팅
    getDetail(no) {
      this.$router.push({
        name: "detail",
        params: {
          no: no
        }
      });
    },
    changeMouseNum(no) {
      this.mouseOverNum = no;
    },
    // 새로운 다이어리 추가하는 화면으로 이동
    moveToWrite() {
      this.$router.push({
        name: "write"
      });
    },
    deleteDiary(no) {
      this.$store.dispatch("deleteDiary", { no: no });
    },
    getEvenColor(index) {
      // 홀수면 리턴
      if ((index + 1) % 2 !== 0) {
        return;
      }
      return "rgb(240, 240, 240)";
    },
    changeKeyword() {
      this.keyword = this.$refs.inputkeyword.value;
      console.log(this.keyword);
    },
    setInitial() {
      // Dom element 초기화
      this.$refs.inputkeyword.value = "";
      this.$refs.sortingcondition.selectedIndex = 0;
      // data() 초기화
      this.keyword = "";
      this.sorting.sortingField = "no";
      this.sorting.soringOrder = false;
    },
    changeSortingCondition() {
      // select element의 첫글자
      //      t -> title 기준
      if (this.$refs.sortingcondition.value[0] == "t") {
        this.sorting.sortingField = "title";
        //      c -> content 기준
      } else if (this.$refs.sortingcondition.value[0] == "c") {
        this.sorting.sortingField = "content";
        //      n -> no 기준
      } else if (this.$refs.sortingcondition.value[0] == "n") {
        this.sorting.sortingField = "no";
      }

      // select element의 두번째 글자가 0 -> 내림차순 : false
      // select element의 두번째 글자가 1 -> 오름차순 : true
      if (this.$refs.sortingcondition.value[1] == "0") {
        this.sorting.soringOrder = false;
      } else {
        this.sorting.soringOrder = true;
      }
    }
  }
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
  cursor: pointer;
}
.active {
  background-color: rgb(236, 247, 234);
  border: 2px solid seagreen;
}
</style>
