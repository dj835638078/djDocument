<template>
  <div class="container-wrap">
    <div class="container container-wrap">
      <router-link to="zero-flow">
        <div class="container-title">
          <div class="title-con">零流量地图跟离线地图有什么不同？</div>
        </div>
      </router-link>

      <router-link to="street-view">
        <div class="container-title">
          <div class="title-con">什么是街景？如何使用街景？</div>
        </div>
      </router-link>

      <router-link to="/how-use-position">
        <div class="container-title">
          <div class="title-con">如何使用腾讯地图的定位功能？</div>
        </div>
      </router-link>

      <router-link to="leak-information">
        <div class="container-title">
          <div class="title-con">我的定位信息会被泄露出去吗？</div>
        </div>
      </router-link>
      <!-- <router-link to="how-contact-us">
        <div class="container-title">
          <div class="title-con">我有问题想反馈，怎么联系你们？</div>
        </div>
      </router-link> -->
      <router-link to="check-flow">
        <div class="container-title">
          <div class="title-con">如何查看腾讯地图花费的流量有多少？</div>
        </div>
      </router-link>

      <router-link to="/zoom-map">
        <div class="container-title">
          <div class="title-con">如何在腾讯地图中缩小、放大所查看的地图？</div>
        </div>
      </router-link>

      <router-link to="three-map">
        <div class="container-title">
          <div class="title-con">什么是3D地图？如何使用？</div>
        </div>
      </router-link>
      <router-link to="satellite-map">
        <div class="container-title">
          <div class="title-con">什么是卫星地图？如何使用？</div>
        </div>
      </router-link>
      <router-link to="how-login">
        <div class="container-title">
          <div class="title-con">腾讯地图如何登陆账号？</div>
        </div>
      </router-link>

      <router-link to="check-road">
        <div class="container-title">
          <div class="title-con">腾讯地图如何查看实时路况？</div>
        </div>
      </router-link>

      <router-link to="/query-route">
        <div class="container-title">
          <div class="title-con">腾讯地图如何查询路线？</div>
        </div>
      </router-link>

      <router-link to="how-search">
        <div class="container-title">
          <div class="title-con">腾讯地图搜索功能如何使用？</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import mixin from '@/config/mixin'
export default {
    name: 'otherFunction',
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
.container-title{
    padding: 0.15rem 0 0.15rem 0;
}
</style>