<template>
  <div>
    <div id="list-header">
      <div class="row">
        <div class="col-6 align-self-start text-left">
          <button type="button" class="btn btn-success btn-sm" @click="moveToWrite">새로운 일기 쓰기</button>
        </div>
        <div class="col-6 text-right input-group">
          <input type="text" class="form-control" placeholder="단어를 입력하세요" />
          <button type="button" class="btn btn-secondary btn-sm">정렬/검색 초기화</button>
        </div>
      </div>
      <!-- todo!!!! 정렬 검색기능 -->
    </div>
    <div id="list-wrapper">
      <div
        class="card"
        v-for="(diary, index) in diarylist"
        :key="diary.no"
        :class="{active : mouseOverNum == diary.no}"
        @mouseover="changeMouseNum(diary.no)"
        @mouseleave="changeMouseNum(0)"
        :style="{backgroundColor: getEvenColor(index)}"
      >
        <div class="card-body">
          <div class="row">
            <div
              class="col-2"
              :style="{ marginRight: '30px', fontSize: '12px', color: 'gray' }"
            >{{ diary.writeat }}</div>
            <div class="col-9">
              <span class="diary-title" @click="getDetail(diary.no)">
                {{
                diary.title
                }}
              </span>
              <!-- MouseOver 삭제 버튼 보이기 -->
              <span v-show="mouseOverNum == diary.no">
                <button class="btn btn-danger btn-sm float-right" @click="deleteDiary(diary.no)">삭제</button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="notExistDiaryMsg" class="row" v-show="diarylist.length == 0">
        <div class="col align-self-center">일기가 없습니다. 일기를 작성하세요.</div>
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
      // 정렬
      sorting: {
        // 정렬기준 diary의 properties 중
        sortingField: "no",
        // 내림차순 -> false  오름차순 -> true..
        soringOrder: false,
      },
    };
  },
  //   Todo 나중에 getter로 바꿔서 해당 유저의 글만 가져오자 + 정렬 검색
  // computed: mapState(["diarylist"]),
  computed: {
    diarylist() {
      return this.$store.state.diarylist.sort((a, b) => {
        return b[this.sorting.sortingField] - a[this.sorting.sortingField];
      });
    },
  },
  methods: {
    // 자세히 보기 라우팅
    getDetail(no) {
      this.$router.push({
        name: "detail",
        params: {
          no: no,
        },
      });
    },
    changeMouseNum(no) {
      this.mouseOverNum = no;
    },
    // 새로운 다이어리 추가하는 화면으로 이동
    moveToWrite() {
      this.$router.push({
        name: "write",
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
  cursor: pointer;
}
.active {
  background-color: rgb(236, 247, 234);
  border: 2px solid seagreen;
}
</style>
