// User-component, Details-component의 부모 컴포넌트
// 모든 데이터는 이 컴포넌트의 data에 담고 있다.
// data를 변경하는 모든 메소드도 이 컴포넌트에 존재
// 하위 컴포넌트는 이 컴포넌트에게 받은 데이터를 슬롯으로 뿌려주는 역할만 한다.
<template>
  <div id="app">
    <div id="user-container">
      <div id="user-wrapper">
        <!-- <상단의 상세 정보> user-component -->
        <!-- 하위에서 호출할 사용자 정의 이벤트 등록 및 핸들러 메소드 선언 -->
        <user v-for="(user, id) in userArr" :key="id" @nameclick="showDetails(user)">
          <!-- slot으로 하단의 html tag를 하위 컴포넌트에게 전달 -->
          <div slot="user-name">{{user.name}}</div>
        </user>
      </div>
    </div>

    <!-- <하단의 상세 정보>  details-component -->
    <div id="details-container">
      <detail>
        <!-- slot으로 detail-component에 html tag 및 data 전송 -->
        <div slot="detail-name">
          <div>{{user.username}}</div>
          <div id="detail-username">{{user.name}}</div>
        </div>
        <div class="detail-detail" slot="detail-address">{{fullAddressInfo}}</div>
        <!-- 같은 식별자의 slot에 두개 넣으면, 병렬로 구성 -->
        <div class="detail-detail" slot="detail-company">{{user.company.name}}</div>
        <div class="detail-detail-small" slot="detail-company">{{fullCompanyInfo}}</div>
      </detail>
    </div>
  </div>
</template>

<script>
import User from "./components/User";
import Detail from "./components/Details";

export default {
  name: "App",
  components: {
    User,
    Detail,
  },
  // Vue instance의 life cycle hook 중 created를 이용해 미리 data 받아오기
  // config/index.js 의 proxy table 설정 확인
  created() {
    // main.js에 전역으로 등록한 $axios를 사용해서 api 서버에 ajax 요청
    this.$axios.get("/report/users").then((response) => {
      // response data를 vue의 data에 할당
      this.userArr = response.data;
    });
  },
  data() {
    return {
      // axios를 이용해 받아오는 data를 담을 array 변수
      userArr: [],

      // 하단에 뿌려줄 data의 초기 세팅(type, default값 등)을 해줘야    ***************
      //  rendering할 때 vue 내의 참조값 undefined 오류가 나지 않는다.  ***************
      //  더 나은 방법 찾아보기  ****************************************************
      user: {
        name: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      },
    };
  },
  methods: {
    // 하위 컴포넌트에 의해 호출되는 이벤트 핸들러
    showDetails(user) {
      // 뿌려줄 데이터를 쉽게 관리하기 위해 vue 인스턴스의 data에 따로 저장
      this.user = user;
    },
  },
  // 주소와 회사 정보를 합쳐주기 위한 computed 속성들
  computed: {
    // user.address 객체 안에 각각 존재하는 값들을 합쳐주는 함수 - template literal
    fullAddressInfo() {
      let adrs = this.user.address;
      // 초기값인 상태라면, return
      if (
        adrs.suite === "" ||
        adrs.street === "" ||
        adrs.city === "" ||
        adrs.zipcode === ""
      ) {
        return "주소 정보";
      }

      return `${adrs.suite}, ${adrs.street}, ${adrs.city} [${adrs.zipcode}]`;
    },
    // user.company 객체 안에 각각 존재하는 값들을 합쳐주는 함수 - template literal
    fullCompanyInfo() {
      let cmpn = this.user.company;
      // 초기값인 상태라면, return
      if (cmpn.catchPhrase === "" || cmpn.bs === "") {
        return "회사 정보";
      }
      return `${cmpn.catchPhrase} (${cmpn.bs})`;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(206, 200, 200);
}
#user-wrapper {
  width: 70%;
  padding: 30px 50px 30px 50px;
}

#details-container {
  border: 1px solid rgb(206, 200, 200);
  height: 300px;
  margin-top: 15px;
}
#detail-username {
  font-size: 15px;
  color: dimgray;
  margin-top: 15px;
}
.detail-detail {
  font-size: 20px;
  margin-top: 20px;
}
.detail-detail-small {
  margin-top: 10px;
  color: rgb(99, 90, 90);
}
</style>
