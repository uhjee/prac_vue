<template>
  <el-container class="login-container background-theme">
    <div class="login-box">
      <!-- form tag에 model 과 validation을 위한 rules를 바인딩 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="login-margin-bottom">VueDiary_HeoJeeHaeng</div>
        <!-- el-form tag 의 자식 컴포넌트이기 때문에 prop으로 model의 데이터를 받는다 -->
        <el-form-item prop="id">
          <el-input
            size="medium"
            ref="id"
            v-model="ruleForm.id"
            placeholder="아이디 입력하세요"
            clearable
            @keydown.enter.native="submitForm('ruleForm')"
          >
            <!-- slot 으로 내부 커스터마이징 -->
            <!-- 자식 컴포넌트가 되는 것 -->
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" @click="submitForm('ruleForm')">sign in</el-button>
        </el-form-item>
      </el-form>
    </div>
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
            max: 10,
            message: "3글자에서 10글자로 입력해주세요",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // el-form 의 이벤트 _ validation check
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // state.id 세팅
          this.$store.dispatch("loginUser", { id: this.ruleForm.id });

          this.$router
            .push({
              name: "list",
            })
            .catch((e) => {
              console.log(e);
            });
          this.$message({
            message: `${this.ruleForm.id}님, 반갑습니다 ;)`,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.background-theme {
  background: #e1eec3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f05053,
    #e1eec3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f05053,
    #e1eec3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.login-container {
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  background-color: white;
  color: tomato;
  width: 300px;
  height: 200px;
  padding: 30px 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
.login-margin-bottom {
  margin-bottom: 20px;
}
.btn-login {
  width: 100%;
  color: white;
  background: #e1eec3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f05053,
    #e1eec3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ec4143,
    #f58d5d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
