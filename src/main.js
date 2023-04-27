import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Theme } from './plugin/theme.js'
import "@/styles/main.less";

Vue.config.productionTip = false
Vue.use(Theme)
new Vue({
  router,
  render: function (h) { return h(App) },
}).
  $mount('#app')
