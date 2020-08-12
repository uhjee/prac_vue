// 하단에서 데이터를 보여주기 위한 component
<template>
  <div id="details-wrapper">
    <div id="details-row">
      <div id="details-name">
        <!-- 부모 컴포넌트에게 html tag 및 data 받기 위한 named slot -->
        <slot name="detail-name"></slot>
      </div>
      <div id="details-detail">
        <!-- 부모 컴포넌트에게 html tag 및 data 받기 위한 named slot -->
        <slot class="detail" name="detail-address"></slot>
        <!-- 부모 컴포넌트에서 detail-company slot에 2개를 넣으면 병렬로 구성된다. -->
        <slot class="detail" name="detail-company"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
};
</script>

<style scoped>
#details-wrapper {
  width: 100%;
  height: 100%;
  display: table;
}
#details-row {
  display: table-row;
  height: 100%;
  text-align: center;
}
#details-name {
  display: table-cell;
  width: 30%;
  border-right: 1px solid rgb(206, 200, 200);
  font-size: 30px;
  padding-top: 15px;
}

#details-detail {
  width: 70%;
  display: table-cell;
  text-align: left;
  padding: 30px;
}
</style>