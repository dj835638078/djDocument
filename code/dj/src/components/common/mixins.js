// 全局混入
export default {
  data() {
   return {
    name: 'mixin'
   }
  },
  //周期函数中的混入会被调用三次???
  created() {
   console.log('mixin...', this.name);
  },
  mounted() {
    console.log("局部混入")
  },
  methods: {
    dj () {
      console.log("混入方法")
    }
  }
}