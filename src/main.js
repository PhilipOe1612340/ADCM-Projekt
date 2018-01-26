import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import { sync } from "vuex-router-sync"
import VueMaterial from "vue-material"
import "vue-material/dist/vue-material.min.css"
import "./theme.scss"


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

