import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import { sync } from "vuex-router-sync"
import VueMaterial from "vue-material"
import "vue-material/dist/vue-material.min.css"
import "./theme.scss"
import Vue2TouchEvents from "vue2-touch-events"
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vue2TouchEvents);

Vue.use(VueMaterial)

Vue.config.productionTip = true

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

