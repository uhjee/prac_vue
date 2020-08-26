
<template>
  <!-- 쓰기와 수정하기는 한 화면에서 vuex의 state 의 formmode를 통해 동적 구성 -->
  <el-container class="write-container">
    <el-header>
      <el-page-header @back="goBack" :content="headingText" title="뒤로가기"></el-page-header>
    </el-header>
    <el-main>
      <el-form :model="writeForm" :rules="rules" ref="writeForm" label-width="80px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="writeForm.title" autofocus.native placeholder="제목을 입력하세요."></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input
            v-model="writeForm.content"
            cols="20"
            wrap="hard"
            type="textarea"
            placeholder="내용을 입력하세요."
            maxlength="100"
            rows="25"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-list">
          <el-button class="btn-submit" @click="onSubmit('writeForm')">{{btnText}}</el-button>
          <el-button @click="moveToList">취 소</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "diaryForm",
  data() {
    return {
      // v-model로 element와 양방향 바인딩
      writeForm: {
        title: "",
        content: "",
      },
      // el-form이 제공하는 validation 을 위한 규칙들
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
  // life cycle hook - mounted : state의 formmode에 따라서 수정 / 쓰기
  mounted() {
    // formmode가  update라면, 컴포넌트 data의 writeForm에 대입
    if (this.formmode == "update") {
      this.writeForm.title = this.diary.title;
      this.writeForm.content = this.diary.content;
    }
  },
  computed: {
    // state의 formmode(write / update)에 따라서 수정 / 쓰기
    formmode() {
      return this.$store.state.formmode;
    },
    // formmode가  update라면, state.diary 가져오기
    diary() {
      return this.$store.state.diary;
    },
    //  formmode에 따라서 버튼의 텍스트를 다르게 보여주기
    btnText() {
      if (this.formmode != "update") {
        return "저장";
      } else return "수정";
    },
    //  formmode에 따라서 페이지 상단의 텍스트를 다르게 보여주기
    headingText() {
      if (this.formmode != "update") return "새 일기 쓰기";
      else return "일기 수정하기";
    },
  },
  methods: {
    //  formmode에 따라서 write, update method 분기
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        // el-form에서 제공하는 유효성 검사
        // valid가 true라면
        if (valid) {
          if (this.formmode == "update") {
            this.updateDiary(this.diary.no);
          } else {
            this.addDiary();
          }
        } else {
          this.$message({
            type: "warning",
            message: "제목과 내용을 다시 한번 확인해주세요.",
          });
          return false;
        }
      });
    },
    addDiary() {
      this.$store.dispatch("addDiary", {
        title: this.writeForm.title,
        content: this.writeForm.content,
      });
      this.$message({
        type: "info",
        message: "새 일기가 작성되었습니다.",
      });
      // routing : list로 라우팅
      this.$router.push({
        name: "list",
      });
    },
    updateDiary(no) {
      this.$store.dispatch("updateDiary", {
        title: this.writeForm.title,
        content: this.writeForm.content,
      });
      this.$message({
        type: "info",
        message: "일기가 수정되었습니다.",
      });
      // routing : detail로 라우팅
      this.$router.push({
        name: "detail",
        params: {
          no: no,
        },
      });
    },
    // 취소버튼 시 list로 보내기
    moveToList() {
      this.$router.push({
        name: "list",
      });
    },
    // 뒤로가기 버튼 이벤트 핸들러
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.write-container {
  height: 87vh;
}
.btn-list {
  display: flex;
  justify-content: center;
}
.btn-submit {
  background-color: #fc7375;
  color: white;
  border: 1px solid #fc7375;
}
textarea {
  resize: none;
}
</style>
