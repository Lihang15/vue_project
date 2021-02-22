// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "./assets/css/global.css";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import store from './vuex/store'
import {
  Message
} from 'element-ui';
import {
  MessageBox
} from 'element-ui';
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
//请求预处理  （每次调用后台接口前调用）
axios.interceptors.request.use(config => {
  console.log(config)
  //把token放到头里
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
