<template>
  <!-- mounted에서 넘겨받은 param으로 vuex에서 조회하고, -->
  <!-- 일치하는 값이 없을 때 렌더링 되지 않도록, v-if 사용  -->
  <div id="diary-wrapper" class="card" v-if="diary">
    <div id="detail-header" class="pt-4 pb-2 card-header">
      <div id="diary-title" class="h3 pb-3 mb-2 border-bottom">{{ diary.title }}</div>
      <div class="row">
        <div class="col-8 text-right align-self-center">
          <span
            class="diary-header-text"
            id="diary-writeat"
          >작성일시: {{ changeDateFmt(diary.writeat) }}</span>
          <span class="diary-header-text" id="diary-writer">작성자: {{ diary.writer }}</span>
        </div>
        <div class="col-4 text-right">
          <button class="btn btn-danger btn-sm" @click="deleteDiary">삭제</button>
        </div>
      </div>
    </div>
    <div id="detail-body" class="card-body p3">
      <!-- white-space : pre-line 설정. \n 줄바꿈을 함께 표시 -->
      <div class="text-left" style="white-space: pre-line">{{ diary.content }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 날짜 관련 함수 만든 js
import DateUtil from "../dateutil";

export default {
  name: "detail",
  //  props: 이전 페이지에서 라우팅할 때 넘기는 params 를 받아주는 props
  props: ["no"],
  // 넘겨받은 no과 일치하는 diary가 vuex에 있는지에 대해 검사하여 네비게이션 보호
  beforeRouteEnter: (to, from, next) => {
    next((app) => {
      if (
        app.$store.state.diarylist.filter((d) => d.no == to.params.no).length ==
        0
      ) {
        alert("일치하는 값이 없습니다.");
        next({
          name: "list",
        });
      }
      next();
    });
  },
  //life cycle hook : 컴포넌트 생성시 url로 넘겨받은 no에 일치하는 값을 vuex에서 가져온다
  created() {
    this.$store.dispatch("setDirayOne", { no: this.no });
  },
  computed: mapState(["diary"]),
  methods: {
    deleteDiary(no) {
      if (confirm("정말로 삭제하시겠어요?")) {
        this.$store.dispatch("deleteDiary", { no: this.no });
        alert("삭제되었습니다.");
        this.$router.push({
          name: "list",
        });
      }
    },
    // 화면에 표시할 날짜 양식 변환 (yyyy. MM. dd HH:mm)
    changeDateFmt(dateString) {
      return DateUtil.convertDetailFmt(dateString);
    },
  },
};
</script>

<style scoped>
#diary-wrapper {
  margin-top: 40px;
}
#diary-title {
  color: seagreen;
  font-weight: bolder;
}
.diary-header-text {
  color: gray;
  font-size: 15px;
  margin-right: 20px;
  margin-left: 20px;
}
</style>
