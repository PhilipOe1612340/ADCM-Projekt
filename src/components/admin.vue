<template>
  <div id="komplett">
    <form class="md-layout" @submit.prevent="newLogin" v-if="!loggedIn">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="Username">Username</label>
                <md-input name="Username" id="name" v-model="name" :disabled="sending" />
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="Password">Password</label>
                <md-input name="password" id="first-name" v-model="pw" :disabled="sending" />
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" @click="newLogin" :disabled="sending">Absenden</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <div v-else>
      <div class="md-layout md-gutter">
        <md-progress-bar v-if="sending" md-mode="indeterminate"></md-progress-bar>
        <div class="md-layout-item md-size-70"> <h1>Artikel verwalten</h1> </div>
        <div class="md-layout-item md-size-10">
          <md-button @click.native="refresh" class="md-icon-button md-dense md-raised md-primary">
            <md-icon>cached</md-icon>
          </md-button>
        </div>
        <div class="md-layout-item md-size-20">
          <md-button class="md-accent" @click.native="logout">Abmelden</md-button>
        </div>
      </div>
      <div v-if="edit">
        <md-card id="card">
          <md-card-header>
            <div class="md-title">
              <form class="md-layout" @submit.prevent="newAricle">
              <md-field>
                <label for="Überschrift">Überschrift</label>
                <md-input name="Überschrift" id="Überschrift" v-model="title" :disabled="sending" />
              </md-field>
              </form>
            </div>
          </md-card-header>
          <md-card-content>
            <form class="md-layout" @submit.prevent="newAricle">
              <md-field>
                <label for="Inhalt">Inhalt</label>
                <md-input type="Inhalt" name="Inhalt" v-model="body" :disabled="sending" />
              </md-field>
            </form>
            {{date}}
          </md-card-content>
          <md-card-actions>
            <md-button type="submit" class="md-secondary" @click.native="close" :disabled="sending">Löschen</md-button>
            <md-button type="submit" class="md-primary" @click.native="newAricle" :disabled="sending">Absenden</md-button>
          </md-card-actions>
        </md-card>
        <!-- <md-snackbar :md-active.sync="success">gespeichert</md-snackbar> -->
      </div>
      <br>
      <div v-for="card in news" :key="card.articleId">
        <md-card id="card">
          <md-card-header>
            <div class="md-title">{{card.title}}</div>
          </md-card-header>

          <md-card-content>
            {{card.body}} <br>
            {{card.datum}}
          </md-card-content>
          <md-card-actions>
            <md-button @click.native="deleteCard(card.articleId)" class="md-primary">Löschen</md-button>
          </md-card-actions>
        </md-card>
        <br>
      </div>
      <md-empty-state v-if="news.length == 0 && !edit"
        md-icon="devices_other"
        md-label="Create your first project"
        md-description="Creating project, you'll be able to upload your design and collaborate with people.">
        <md-button class="md-primary md-raised" @click="showEdit">Create first project</md-button>
      </md-empty-state>

      <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="error" md-persistent>
        <span>{{error}}</span>
        <md-button class="md-primary" @click="loadNews">Retry</md-button>
        <md-button class="md-primary" @click="clearError">Close</md-button>
      </md-snackbar>
      <md-button id="fab" @click.native="showEdit" class="md-fab md-primary" >
        <md-icon @click="newAricle">add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "aktuelles",
  data: () => ({
    edit: false,
    duration: 4000
  }),
  methods: {
    clearError() {
      this.$store.commit("clearError");
    },
    checkLogin() {
      this.$store.commit("cookie", {
        token: this.$cookies.get("token"),
        name: this.$cookies.get("un")
      });
      this.$store.dispatch("getNews");
    },
    newLogin() {
      this.$store
        .dispatch("login")
        .then(token => {
          this.$cookies.set("token", token, 20 * 60);
          this.$cookies.set("un", this.name, 20 * 60);
          this.pw = null;
        })
        .catch(() => {
          alert("Fehler");
        });
    },
    showEdit() {
      this.edit = !this.edit;
      if (this.edit) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 20);
      }
    },
    close() {
      this.edit = false;
      this.$store.commit("title");
      this.$store.commit("body");
    },
    deleteCard(nr) {
      console.log(nr);
      this.$store.dispatch("delete", nr);
    },
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("un");
      this.$store.commit("cookie", {});
    },
    loadNews() {
      this.$store.dispatch("getNews");
    },
    refresh() {
      this.loadNews();
    },
    newAricle() {
      this.$store.dispatch("new").then(() => {
        this.$store.dispatch("getNews");
        this.close();
      });
    }
  },
  beforeMount() {
    this.checkLogin();
  },
  computed: {
    pw: {
      get() {
        return this.$store.getters.pw;
      },
      set(val) {
        this.$store.commit("pw", val);
      }
    },
    name: {
      get() {
        return this.$store.getters.name;
      },
      set(val) {
        this.$store.commit("name", val);
      }
    },
    title: {
      get() {
        return this.$store.getters.title;
      },
      set(val) {
        this.$store.commit("title", val);
      }
    },
    body: {
      get() {
        return this.$store.getters.body;
      },
      set(val) {
        this.$store.commit("body", val);
      }
    },
    error() {
      return this.$store.getters.getError;
    },
    sending() {
      return this.$store.getters.getLoading;
    },
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    date() {
      moment.locale("de");
      return moment(new Date()).format("LL");
    },
    news() {
      var news = this.$store.getters.getNews;
      moment.locale("de");
      news.forEach(card => {
        card.datum = moment(card.date).format("LL");
      });
      return news;
    }
  }
};
</script>


<style scoped>
#card > * {
  word-wrap: break-word;
  overflow: hidden;
}

#komplett {
  width: 80%;
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}

#fab {
  position: fixed;
  right: 30px;
  bottom: 50px;
}
</style>
