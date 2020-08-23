<template>
  <el-container direction="vertical">
    <el-header>Header</el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="12" id="login-wrapper">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <h1 class="h3 mb-3 font-weight-normal">VueDiary_HeoJeeHaeng</h1>
            <el-input
              ref="id"
              v-model="ruleForm.id"
              placeholder="아이디를 2글자 이상 입력하세요"
              @keyup.enter="loginUser"
              clearable
            >
              <template slot="prepend">
                <i class="el-icon-user-solid"></i>
              </template>
            </el-input>
            <el-button type="plain" @click="submitForm(ruleForm)">로-그인</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "login",
  // mounted:: 화면 접속 시, input 엘레먼트로 포커싱
  //            DOM 객체를 만져야 하기 때문에, mounted hook 사용
  mounted() {
    this.$refs.id.focus();
  },
  data() {
    return {
      ruleForm: {
        id: "",
      },
      rules: {
        id: [
          {
            required: true,
            message: "id를 입력해주세요",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "3글자에서 5글자로 입력해주세요",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      console.log(this.$refs[formName]);
      this.$refs[formName].id((valid) => {
        if (valid.length > 2) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // state.id 세팅
      this.$store.dispatch("loginUser", { id: this.inputid });

      this.$router
        .push({
          name: "list",
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.el-container {
  text-align: center;
}
.el-header {
  text-align: center;
  line-height: 60px;
}
#login-wrapper {
  background-color: seagreen;
  color: white;
  width: 400px;
  height: 250px;
  padding: 30px;
  border-radius: 4px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  border: 1px gray solid;
  margin-left: -200px;
  margin-top: -230px; */
}
div {
  margin: 10px;
}
</style>
