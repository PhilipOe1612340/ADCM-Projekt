<template>
  <div v-touch:swipe.left="swipe_Left" v-touch:swipe.right="swipe_Right">
    <md-tabs md-sync-route md-alignment="centered" v-if="$store.state.route.path != '/admin'" >
      <md-tab id="tab-leistungen" md-label="leistungen" to="/leistungen">
      </md-tab>
      <md-tab id="tab-referenzen" md-label="referenzen" to="/referenzen">
      </md-tab>
      <md-tab id="tab-kunden" md-label="kunden" to="/kunden">
      </md-tab>
      <md-tab id="tab-aktuelles" md-label="aktuelles" to="/aktuelles">
      </md-tab>
    </md-tabs>

    <div id="themeswitch">
      <span class="clickable" v-if="theme === false" @click="changeTheme"><md-icon class="md-primary">wb_sunny</md-icon></span>
      <span class="clickable" v-else  @click="changeTheme"><md-icon>brightness_3</md-icon></span>
    </div>

    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="footer" v-if="$store.state.route.path != '/admin'">
      <ul>
        <li><router-link to="/impressum" tag="span">Impressum</router-link></li>
        <li><router-link to="/kontakt" tag="span">Kontakt</router-link></li>
        <li><router-link to="/admin" tag="span">Administrieren</router-link></li>
      </ul>
    </div>
    <div class="footer" v-else>
      <ul>
        <li><router-link to="/leistungen" tag="span">Home</router-link></li>
      </ul>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Header",
  methods: {
    swipe_Right(direction) {
      switch (this.$store.state.route.path) {
        case "/referenzen":
          this.$router.push("/leistungen");
          break;
        case "/kunden":
          this.$router.push("/referenzen");
          break;
        case "/aktuelles":
          this.$router.push("/kunden");
          break;
        case "/leistungen":
          this.$router.push("/aktuelles");
          break;
      }
    },
    swipe_Left(direction) {
      switch (this.$store.state.route.path) {
        case "/referenzen":
          this.$router.push("/kunden");
          break;
        case "/kunden":
          this.$router.push("/aktuelles");
          break;
        case "/aktuelles":
          this.$router.push("/leistungen");
          break;
        case "/leistungen":
          this.$router.push("/referenzen");
          break;
      }
    },
    changeTheme () {
      this.theme = !this.theme
      this.show = !this.show
      if (this.theme) {
        Vue.material.theming.theme = 'light'
      } else {
        Vue.material.theming.theme = 'default'
      }
      localStorage.setItem('theme', this.theme)
    }
  },
  computed: {
    theme: {
      get () {
        return this.$store.state.general.theme
      },
      set (val) {
        this.$store.commit('setTheme', val)
      }
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#spacer {
  width: 10px;
}

.footer {
  position: relative;
  bottom: -40px;
  margin-left: 10%;
  color: white;
  font-style: normal;
  margin-bottom: 20px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s, transform 0.35s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}
.footer span {
  cursor: pointer;
}
.footer span:hover {
  font-weight: bold;
}
.footer ul {
  list-style-type: none;
}
.footer li {
  margin: 1%;
}
#themeswitch {
    position: fixed;
    top: 13px;
    left: 13px;
    z-index: 3;
    cursor: pointer;
  }
</style>
