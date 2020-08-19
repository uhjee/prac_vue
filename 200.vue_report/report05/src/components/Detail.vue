<template>
  <div id="diary-wrapper" class="card">
    <div id="detail-header" class="pt-4 pb-2 card-header">
      <div id="diary-title" class="h3 pb-3 mb-2 border-bottom">{{ diary.title }}</div>
      <div class="row">
        <div class="col">
          <span id="diary-writeat">작성날짜: {{ diary.writeat }}</span>
        </div>
        <div class="col text-right">
          <button class="btn btn-danger btn-sm" @click="deleteDiary">삭제</button>
        </div>
      </div>
    </div>
    <div id="detail-body" class="card-body p3">
      <div class="text-left">{{ diary.content }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "detail",
  //   이전 페이지에서 라우팅할 때 넘기는 params 를 받아주는 props
  props: ["no"],
  //   마운트될 때, diary.no 에 일치하는 diary를 state 에 세팅
  mounted() {
    this.$store.dispatch("setDirayOne", { no: this.no });
  },
  computed: mapState(["diary"]),
  methods: {
    deleteDiary(no) {
      this.$store.dispatch("deleteDiary", { no: this.no });
      this.$router.push({
        name: "list",
      });
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
#diary-writeat {
  color: gray;
  font-size: 14px;
}
</style>
