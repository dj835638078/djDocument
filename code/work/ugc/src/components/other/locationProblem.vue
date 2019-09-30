<template>
  <div class="container-wrap">
    <div class="container container-wrap">
      <router-link to="new-institution">
        <div class="container">
          <div class="title-con">如果某个位置新增了一个机构、店面或者建筑，而腾讯地图上没有显示，怎么通知你们？</div>
        </div>
      </router-link>

      <router-link to="error-notification">
        <div class="container">
          <div class="title-con">地图上某地点的位置、信息有错误怎么通知你们？</div>
        </div>
      </router-link>

      <router-link to="/line-change">
        <div class="container">
          <div class="title-con">公交线路不正确，某条线路已经更改、停运。站台迁移怎么办？</div>
        </div>
      </router-link>
      <router-link to="/name-notshown">
        <div class="container">
          <div class="title-con">为什么我通过“商户标注”标注了一个新地址之后，在地图上没有显示其名称？</div>
        </div>
      </router-link>
      <router-link to="/no-information">
        <div class="container">
          <div class="title-con">为什么地图上有些信息不准确或者根本没有？</div>
        </div>
      </router-link>
      <router-link to="/label-merchant">
        <div class="container">
          <div class="title-con">请问怎么样才能在腾讯地图上标注商户呢？</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style scope>
.map-usage-help .titles {
  font-size: 0.2rem;
  color: #333333;
}
.position-router {
  border-top: 0.06rem solid #f6f6f6;
}
.title-con {
  font-size: 0.16rem;
  color: #333333;
}
</style>