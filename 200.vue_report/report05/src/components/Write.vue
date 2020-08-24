<template>
  <el-form :model="writeForm" :rules="rules" ref="writeForm" label-width="80px">
    <el-form-item label="Title" prop="title">
      <el-input v-model="writeForm.title" autofocus placeholder="제목을 입력하세요."></el-input>
    </el-form-item>
    <el-form-item label="Content" prop="content">
      <el-input
        v-model="writeForm.content"
        cols="20"
        wrap="hard"
        type="textarea"
        placeholder="내용을 입력하세요."
        maxlength="30"
        rows="10"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item style="display: flex; justify-content: center;">
      <el-button type="success" @click="onSubmit('writeForm')">저장</el-button>
      <el-button @click="cancelAdd">취소</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "write",
  data() {
    return {
      // v-model로 element와 양방향 바인딩
      writeForm: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "제목을 입력하세요", trigger: "blur" },
          { min: 2, message: "길이가 2글자 이상이어야 해요.", trigger: "blur" },
        ],
        content: [
          { required: true, message: "내용을 입력하세요.", trigger: "blur" },
          {
            min: 10,
            message: "내용이 너무 짧아요. 10글자 이상이에요.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // life cycle hook - mounted :화면 진입 시, 제목 입력란에 포커싱
  // mounted() {
  //   this.$refs.title.focus();
  // },
  methods: {
    onSubmit(formName) {
      console.log(this.$refs);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDiary();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addDiary() {
      this.$store.dispatch("addDiary", {
        title: this.writeForm.title,
        content: this.writeForm.content,
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
