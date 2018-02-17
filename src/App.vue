<template>
  <div id="tabs" v-touch:swipe.left="swipe_Left" v-touch:swipe.right="swipe_Right">
    <md-tabs md-sync-route md-alignment="centered" v-if="$store.state.route.path != '/admin'">
      <md-tab id="tab-leistungen" md-label="leistungen" to="/leistungen" />
      <md-tab id="tab-referenzen" md-label="referenzen" to="/referenzen" />
      <md-tab id="tab-kunden" md-label="kunden" to="/kunden" />
      <md-tab id="tab-aktuelles" md-label="aktuelles" to="/aktuelles" />
      <!-- <md-tab id="tab-newcard" md-label="card" to="/card">
      </md-tab> -->
    </md-tabs>

    <div id="themeswitch">
      <span class="clickable" v-if="theme === false" @click="changeTheme">
        <md-icon class="md-primary">wb_sunny</md-icon>
      </span>
      <span class="clickable" v-else @click="changeTheme">
        <md-icon>brightness_3</md-icon>
      </span>
    </div>

    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <br>

    <footer id="footer" class="footer">
      <ul v-if="$store.state.route.path != '/admin'">
        <li>
          <router-link to="/impressum" tag="span">Impressum</router-link>
        </li>
        <li>
          <router-link to="/kontakt" tag="span">Kontakt</router-link>
        </li>
        <li>
          <router-link to="/admin" tag="span">Administrieren</router-link>
        </li>
      </ul>
      <ul v-else>
        <li>
          <router-link to="/leistungen" tag="span">Home</router-link>
        </li>
      </ul>
    </footer>

    <md-snackbar id="errorBar" md-position="center" :md-duration="4000" :md-active.sync="error" md-persistent>
      <span>{{error}}</span>
      <md-button class="md-primary" @click="clearError">Schließen</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "Header",
    data: () => ({
      duration: 4000
    }),
    methods: {
      clearError() {
        this.$store.commit("clearError");
      },
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
      changeTheme() {
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
      error() {
        return this.$store.getters.getError;
      },
      theme: {
        get() {
          return this.$store.state.general.theme
        },
        set(val) {
          this.$store.commit('setTheme', val)
        }
      }
    },
  };

</script>

<style>
  html {
    overflow-x: hidden;
  }

  #tabs {
    min-height: 98vh;
  }

  #footer {
    width: 100vw;
    height: 5%;
    background-color: rgb(68, 68, 68);
    position: absolute;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1000;
  }

  #errorBar{
    z-index: 9001;
  }

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
    float: left;
    margin-right: 1%;
  }

  #themeswitch {
    position: fixed;
    top: 13px;
    left: 13px;
    z-index: 3;
    cursor: pointer;
  }

</style>
