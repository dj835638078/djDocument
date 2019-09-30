<template>
  <div class="container-wrap">
    <div class="container container-wrap">
      <router-link to="street-view-error">
        <div class="container">
          <div class="title-con">某处街景出现拼接错误，或者人脸、车牌等隐私信息未做模糊处理怎么办？</div>
        </div>
      </router-link>

      <router-link to="inaccurate-position">
        <div class="container">
          <div class="title-con">为什么有时候地图定位不准？</div>
        </div>
      </router-link>

      <router-link to="/map-tip">
        <div class="container">
          <div class="title-con">使用手机腾讯地图时，提示“网络连接失败请稍候再试”，怎么办？</div>
        </div>
      </router-link>
      <router-link to="/download-failed">
        <div class="container">
          <div class="title-con">下载离线地图失败怎么办？</div>
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