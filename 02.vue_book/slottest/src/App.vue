<template>
  <div id="app">
    <speech-box :headerText="A.header" :footerText="A.footer">
      <div>
        <p>{{A.message}}</p>
      </div>
    </speech-box>

    <speech-box class="sanders" :headerText="B.header" :footerText="B.footer">
      <div>
        <p class="sanders-content">{{B.message}}</p>
      </div>
    </speech-box>
  </div>
</template>

<script>
import SpeechBox from "./components/SpeechBox.vue";

export default {
  name: "app",
  components: { SpeechBox },
  data() {
    return {
      A: {
        header: "오바마 대통령 고별 연설문",
        footer: "2017. 01. 10 - 시카고",
        message: "저의 동료 국민 여러분, ... (생략)",
      },
      B: {
        header: "버니샌더스 경선 패배 연설문",
        footer: "2016.07.25 - 필라델피아",
        message: "감사합니다. 여러분 정말 ... (생략)",
      },
    };
  },
};
</script>

<style scoped>
.sanders {
  background-color: rgb(226, 231, 198);
}
.sanders-content {
  font-family: 굴림;
  text-decoration: underline;
}
</style>
