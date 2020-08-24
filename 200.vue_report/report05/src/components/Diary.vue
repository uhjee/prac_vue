<template>
  <el-container>
    <el-header>
      <navbar></navbar>
    </el-header>
    <el-container>
      <el-aside width="200px" style="padding: 30px">
        <span @click="moveToListTable">리스트(표)</span>
      </el-aside>
      <el-container>
        <el-main>
          <!-- /diary 하위의 route 들이 보여질 곳 -->
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
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
  methods: {
    moveToListTable() {
      this.$router.push({
        name: "listtable",
      });
    },
  },
};
</script>

<style scoped>
#diary-container {
  margin-top: 80px;
  margin-bottom: 10px;
}
</style>
