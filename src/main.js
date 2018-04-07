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
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Meta from 'vue-meta'

Vue.use(Meta)

Raven
.config('https://c9d1539f10da47fda0b8662bb15b2b6e@sentry.io/298742')
.addPlugin(RavenVue, Vue)
.install();

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

