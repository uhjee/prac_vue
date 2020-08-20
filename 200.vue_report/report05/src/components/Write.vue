<template>
  <div class="col">
    <div>
      <textarea
        class=".form-control col-10"
        id="text-title"
        ref="title"
        rows="1"
        placeholder="2글자 이상 제목을 적어주세요."
        v-model="title"
      ></textarea>
    </div>
    <div>
      <textarea
        class=".form-control col-10"
        id="text-content"
        rows="8"
        cols="50"
        wrap="hard"
        placeholder="5글자 이상 내용을 적어주세요."
        v-model="content"
      ></textarea>
    </div>
    <div>
      <button type="button" @click="addDiary" class="btn btn-success btn-sm">저 장</button>
      <button type="button" @click="cancelAdd" class="btn btn-secondary btn-sm">취 소</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "write",
  data() {
    return {
      // v-model로 element와 양방향 바인딩
      title: "",
      content: "",
    };
  },
  // life cycle hook - mounted :화면 진입 시, 제목 입력란에 포커싱
  mounted() {
    this.$refs.title.focus();
  },
  methods: {
    addDiary() {
      if (this.title.length < 2) {
        alert("제목을 2글자 이상 입력해주세요.");
        return;
      }
      if (this.content.length < 5) {
        alert("내용을 5글자 이상 입력해주세요.");
        return;
      }

      // vuex: diary 추가하는 action으로 입력받은 title, content 전송
      this.$store.dispatch("addDiary", {
        title: this.title,
        content: this.content,
      });

      // routing : list로 라우팅
      this.$router.push({
        name: "list",
      });
    },
    // 취소버튼 시 list로 보내기
    cancelAdd() {
      this.$router.push({
        name: "list",
      });
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
