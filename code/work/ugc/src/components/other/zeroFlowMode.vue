<template>
  <div class="container-wrap">
    <div class="container container-wrap">
      <router-link to="is-free">
        <div class="container-title">
          <div class="title-con">使用手机腾讯地图是否会收费？</div>
        </div>
      </router-link>

      <router-link to="zero-flow">
        <div class="container-title">
          <div class="title-con">零流量地图跟离线地图有什么不同？</div>
        </div>
      </router-link>

      <router-link to="/start-zero-flow">
        <div class="container-title">
          <div class="title-con">零流量功能如何开启？</div>
        </div>
      </router-link>

      <router-link to="/upgread-use">
        <div class="container-title">
          <div class="title-con">软件版本升级后，以前安装的离线地图还能用吗？</div>
        </div>
      </router-link>
      <router-link to="how-contact-use">
        <div class="container-title">
          <div class="title-con">安装腾讯地图后，是否一定需要下载离线地图才能使用？</div>
        </div>
      </router-link>
      <router-link to="/zero-diff">
        <div class="container-title">
          <div class="title-con">零流量模式下的驾车路线规划结果与在线条件下的有何不同？</div>
        </div>
      </router-link>
      <router-link to="how-search-consistent">
        <div class="container-title">
          <div class="title-con">零流量模式下的搜索地点或公交路线的结果和在线的是一样的吗？</div>
        </div>
      </router-link>

      <router-link to="update-no">
        <div class="container-title">
          <div class="title-con">如提示离线地图需要更新时，是否可以选择不更新？</div>
        </div>
      </router-link>
      <router-link to="download-need">
        <div class="container-title">
          <div class="title-con">每次收到离线地图的更新提示时，我需要重新下载已有的离线地图包吗？</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import mixin from '@/config/mixin'
export default {
    name: 'zeroFlowMode',
    mixins: [mixin],
    data: function () {
        return {
            
        }
    },
    mounted: function () {
        nativeSetNavBarTitle('腾讯地图')
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
    },
}

</script>
<style scoped>
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
.container-title{
    padding: 0.15rem 0 0.15rem 0;
}
</style>