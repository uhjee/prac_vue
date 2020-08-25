<template>
  <el-container>
    <el-header>
      <navbar></navbar>
    </el-header>
    <el-container>
      <el-main>
        <!-- /diary 하위의 route 들이 보여질 곳 -->
        <router-view></router-view>
      </el-main>
      <el-footer>Footer 입니다.</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import navbar from "./Navbar";

export default {
  name: "diary",
  components: { navbar },
  //네비게이션 보호 :: 로그인을 통해 들어오지 않는다면(store에 id 가 저장되지 않았다면), 다시 리디렉션
  beforeRouteEnter(to, from, next) {
    // beforeRouteEnter() 등의 메소드는 Vue instance가 만들어 지기 전에 실행
    //      -> this. 로 접근 불가하기 때문에 next() 내부에서 접근
    next((app) => {
      if (!app.$store.state.id) {
        app.$message({
          message: "로그인부터 하셔야 해요...:(",
          type: "error",
        });
        next("/");
        return;
      }
    });
  },
};
</script>

<style scoped>
.el-container.is-vertical {
  background-color: rgb(228, 225, 220);
}
.el-header {
  padding: 0;
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
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
.el-main {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
</style>
