<template>
  <div id="app">
    <component :is="currentTabComponent"></component>
  </div>
</template>

<script>
import '../commons/css/common.css'
import '../commons/js/jsbridge.js'
import '../commons/js/intercept.js'
import '../commons/js/click.js'
import '../commons/js/global.js'
import '../commons/js/native_interface'
import accident from '../components/reporters/accident'

export default {
    name: 'App',
    data: function () {
        return {
            currentTabComponent: 'accident'
        }
    },
    components: {
      accident
    }
}
</script>
