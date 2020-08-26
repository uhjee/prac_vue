<template>
  <div>
    <!-- mounted에서 넘겨받은 param으로 vuex에서 조회하고, -->
    <!-- 일치하는 값이 없을 때 렌더링 되지 않도록, v-if 사용  -->
    <el-container class="detail-container" v-if="diary">
      <el-header>
        <el-header>
          <el-page-header @back="goBack" content="일기 보기" title="뒤로가기"></el-page-header>
        </el-header>
      </el-header>
      <el-main class="detail-main">
        <div class="detail-header">
          <div class="header-writeat">{{changeDateFmt(diary.writeat)}}</div>
          <div class="header-title">{{diary.title}}</div>
          <div class="btn-list">
            <!-- 리스트로 이동하는 버튼 -->
            <el-button
              class="btn-back"
              size="mini"
              type="plain"
              icon="el-icon-back"
              circle
              @click="moveToList"
            ></el-button>
            <!-- 수정하기로 이동하는 버튼 -->
            <el-button
              class="btn-update"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="moveToUpdate(diary.no)"
            ></el-button>
            <!-- 삭제 메세지 및 버튼 -->
            <el-popconfirm
              confirmButtonText="네"
              cancelButtonText="아니에요"
              confirmButtonType="danger"
              cancelButtonType="plain"
              icon="el-icon-info"
              iconColor="red"
              title="정말 삭제하실 건가요?"
              @onConfirm="deleteDiary(diary.no)"
            >
              <el-button
                class="btn-delete"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </div>
          <div class="header-writer">작성자: {{diary.writer}}</div>
        </div>
        <div class="main-content">{{diary.content}}</div>
      </el-main>
    </el-container>
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
        app.$message({
          type: "warning",
          message: "일치하는 일기가 없습니다.",
        });
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
    moveToList() {
      this.$router.push({
        name: "list",
      });
    },
    // 수정하기 메소드
    moveToUpdate(no) {
      // formmode를 update로 전환, 이후 일치하는 diary 가져온다
      this.$store.dispatch("changeFormMode", {
        formmode: "update",
        no: no,
      });
      // update로 라우팅
      this.$router.push({
        name: "update",
      });
    },
    // 삭제 메소드
    deleteDiary(no) {
      this.$store.dispatch("deleteDiary", { no: this.no });
      this.$message({
        type: "info",
        message: `${no}번 일기가 삭제되었습니다.`,
      });
      this.moveToList();
    },
    // 화면에 표시할 날짜 양식 변환 (yyyy. MM. dd HH:mm)
    changeDateFmt(dateString) {
      return DateUtil.convertKoreanDetailFmt(dateString);
    },
    // 뒤로가기 버튼 이벤트 핸들러
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.detail-container {
  height: 87vh;
}
.detail-header {
  box-sizing: border-box;
  height: 130px;
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 0 30px;
  border-bottom: 1px solid rgb(194, 187, 187);
}
.header-writeat {
  font-size: 18px;
  color: tomato;
  margin-bottom: 5px;
}
.header-title {
  font-size: 26px;
  color: rgb(133, 125, 124);
  font-weight: 500;
  margin-bottom: 10px;
}
.header-writer {
  font-size: 16px;
  color: rgb(133, 125, 124);
  margin-left: 20px;
}
.btn-list {
  float: right;
}
.btn-list .el-button {
  margin: 0 5px;
}
.btn-update {
  color: white;
  background-color: rgb(161, 156, 156);
}
.btn-back:hover {
  color: white;
  background-color: #f8b4b5;
  border: 1px solid #f8b4b5;
}
.btn-update:hover {
  color: white;
  background-color: gray;
}
.main-content {
  color: rgb(133, 125, 124);
  /* white-space : pre-line 설정. \n 줄바꿈을 함께 표시 */
  white-space: pre-line;
  padding: 0 40px;
}
</style>
