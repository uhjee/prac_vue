<template>
  <div id="diary-wrapper" class="card">
    <div id="detail-header" class="pt-4 pb-2 card-header">
      <div id="diary-title" class="h3 pb-3 mb-2 border-bottom">
        {{ diary.title }}
      </div>
      <div class="row">
        <div class="col-8 text-right">
          <span class="diary-header-text" id="diary-writeat"
            >작성날짜: {{ diary.writeat }}</span
          >
          <span class="diary-header-text" id="diary-writer"
            >작성자: {{ diary.writer }}</span
          >
        </div>
        <div class="col-4 text-right">
          <button class="btn btn-danger btn-sm" @click="deleteDiary">
            삭제
          </button>
        </div>
      </div>
    </div>
    <div id="detail-body" class="card-body p3">
      <!-- white-space : pre-line 설정해줘야 \n 줄바꿈을 함께 표시해준다 -->
      <div class="text-left" style="white-space: pre-line">
        {{ diary.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "detail",
  //  props: 이전 페이지에서 라우팅할 때 넘기는 params 를 받아주는 props
  props: ["no"],
  //  mounted() :  마운트될 때, diary.no 에 일치하는 diary를 state 에 세팅
  mounted() {
    this.$store.dispatch("setDirayOne", { no: this.no });
  },
  computed: mapState(["diary"]),
  methods: {
    deleteDiary(no) {
      this.$store.dispatch("deleteDiary", { no: this.no });
      this.$router.push({
        name: "list"
      });
    }
  }
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
