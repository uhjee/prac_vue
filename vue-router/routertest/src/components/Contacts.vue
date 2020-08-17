
<template>
  <div>
    <h1>Contacts</h1>
    <div class="wrapper">
      <!-- v-for 에 따른 동적 라우트 하이퍼링크 작성 -->
      <div class="box" v-for="c in contacts" :key="c.no">
        <!-- contacts/:no 형태로 URI 경로 요청 -->
        <!-- <router-link :to="'/contacts/' + c.no">{{c.name}}</router-link> -->
        <!-- named route 이용 -->
        <router-link :to="{name: 'contactbyno', params:{no: c.no}}">{{c.name}}</router-link>
      </div>
    </div>
    <!-- App.vue에 chilren 등록한 경우, 해당 요청에 해당하면 자식 라우트 표현 -->
    <router-view></router-view>
  </div>
</template>
<script>
import contactlist from "../ContactList";

export default {
  name: "contacts",
  data() {
    return {
      contacts: contactlist.contacts,
    };
  },
};
</script>

</script>
<style>
.wrapper {
  background-color: #fff;
  clear: both;
  display: table;
}
.box {
  float: left;
  background-color: aqua;
  border-radius: 5px;
  padding: 10px;
  margin: 3px;
  text-align: center;
  font-size: 120%;
  width: 100px;
  font-weight: bold;
}
a:link,
a:visited {
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
</style>