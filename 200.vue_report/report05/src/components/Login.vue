<template>
  <el-container direction="vertical">
    <el-header>Header</el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="12" id="login-wrapper">
          <!-- form tag에 model 과 validation을 위한 rules를 바인딩 -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <h1 class="h3 mb-3 font-weight-normal">VueDiary_HeoJeeHaeng</h1>
            <!-- el-form tag 의 자식 컴포넌트이기 때문에 prop으로 model의 데이터를 받는다 -->
            <el-form-item prop="id">
              <el-input
                size="medium"
                ref="id"
                v-model="ruleForm.id"
                placeholder="아이디 입력하세요"
                clearable
              >
                <!-- slot 으로 내부 커스터마이징 -->
                <!-- 자식 컴포넌트가 되는 것 -->
                <template slot="prepend">
                  <i class="el-icon-user-solid"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="plain" @click="submitForm('ruleForm')">로-그인</el-button>
            </el-form-item>
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
.el-form-item {
  margin: 0px 0px 30px 0px;
}
</style>
