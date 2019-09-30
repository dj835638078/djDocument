<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './commons/css/common.css'
import './commons/js/jsbridge.js'
import './commons/js/intercept.js'
import './commons/js/click.js'
import './commons/js/global.js'
import './commons/js/native_interface'
export default {
    name: 'App'
}
</script>
