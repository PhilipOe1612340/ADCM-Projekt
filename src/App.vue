<template>
  <div id="tabs" v-touch:swipe.left="swipe_Left" v-touch:swipe.right="swipe_Right">
    <!-- DEVELOPMENT SIGN -->
    <span style="margin:auto; color:rgb(255, 132, 132); position:fixed; top:10px; left:20px; z-index:200; pointer-events: none;">NO OFFICAL WEBSITE</span>
    <md-tabs md-sync-route md-alignment="centered" v-if="$store.state.route.path != '/admin'">
      <md-tab id="tab-leistungen" md-label="leistungen" to="/leistungen" />
      <md-tab id="tab-referenzen" md-label="referenzen" to="/referenzen" />
      <md-tab id="tab-kunden" md-label="kunden" to="/kunden" />
      <md-tab id="tab-aktuelles" md-label="aktuelles" to="/aktuelles" />
    </md-tabs>

    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <br>

    <footer id="footer" :class="theme?'light':'dark'">
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
    <md-snackbar id="errorBar" :md-active.sync="showSnackbar">{{success}}</md-snackbar>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: "Header",
    data: () => ({
      duration: 4000
    }),
    methods: {
      clearError() {
        this.$store.commit("clearError");
      },
      swipe_Right(direction, event) {
        if (event.path.length > 8) return;

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
      swipe_Left(direction, event) {
        if (event.path.length > 8) return;

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
    },
    beforeMount() {
      this.$store.dispatch("getNews");
    },
    computed: {
      error: {
        get() {
          return this.$store.getters.getError;
        },
        set(val) {
          this.$store.commit("clearError");
        }
      },
      theme: {
        get() {
          return this.$store.state.general.theme;
        },
        set(val) {
          this.$store.commit("setTheme", val);
        }
      },
      success: {
        get() {
          return this.$store.getters.getSuccess;
        },
        set(val) {
          this.$store.commit("clearSuccess");
        }
      },
      showSnackbar: {
        get() {
          return this.success ? true : false;
        },
        set(val) {
          this.$store.commit("clearSuccess");
        }
      }
    }
  };

</script>

<style>
  #tabs {
    overflow-x: hidden;
  }

  #tabs {
    min-height: 98vh;
  }

  #footer {
    width: 100%;
    height: 5%;
    min-height: 35px;
    max-height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1000;
  }

  #footer.light {
    background-color: rgb(214, 214, 214);
  }

  #footer.dark {
    background-color: rgb(68, 68, 68);
  }

  #errorBar {
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

  #footer span {
    cursor: pointer;
  }

  #footer span:hover {
    font-weight: bold;
  }

  #footer ul {
    list-style-type: none;
  }

  #footer li {
    float: left;
    margin-right: 1%;
  }

  #themeswitch {
    position: absolute;
    top: 13px;
    left: 13px;
    z-index: 3;
    cursor: pointer;
  }

</style>
