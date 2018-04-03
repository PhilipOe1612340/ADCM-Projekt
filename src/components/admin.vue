<template>
  <div id="komplett">
    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="error" md-persistent>
      <span>{{error}}</span>
    </md-snackbar>
    <!-- Not Logged in Card -->
    <div id="cardContainer" v-if="!loggedIn">
      <!-- TODO: Put in different File -->
      <md-card class="md-layout-item" id="loginCard">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <form class="md-layout" @keyup.enter="newLogin" @submit.prevent="newLogin">
            <md-field>
              <label for="Username">Username</label>
              <md-input name="Username" id="name" v-model="name" />
            </md-field>
            <md-field>
              <label for="Password">Password</label>
              <md-input name="password" autocomplete="off" id="first-name" v-model="pw" type="password" />
            </md-field>
          </form>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" @click="newLogin">Anmelden</md-button>
        </md-card-actions>
      </md-card>
    </div>
    <!-- Logged in View -->
    <div v-else>
      <!-- Header for logged in version -->
      <div id="articleHeader" class="md-layout md-gutter">
        <div class="md-layout-item md-large-size-20 md-xsmall-size-50">
          <h1>Artikel verwalten</h1>
        </div>
        <div class="md-layout-item md-large-size-55 md-xsmall-size-25" id="refresh">
          <md-button @click.native="refresh" class="md-icon-button md-dense md-flat">
            <md-icon>cached</md-icon>
          </md-button>
        </div>
        <div class="md-layout-item md-large-size-25 md-xsmall-size-25">
          <md-button class="md-flat" id="logout" @click.native="logout">Abmelden</md-button>
        </div>
      </div>
      <!-- Progress bar -->
      <md-progress-bar v-if="sending" md-mode="query" />
      <div id="articlelayout">
        <!-- New article card -->
        <div v-if="edit">
          <md-card id="newCard">
            <md-card-header>
              <md-radio class="md-primary" v-model="type" value="leistungen">Leistungen</md-radio>
              <md-radio class="md-primary" v-model="type" value="referenzen">Referenzen</md-radio>
              <md-radio class="md-primary" v-model="type" value="kunden">Kunden</md-radio>
              <md-radio class="md-primary" v-model="type" value="aktuelles">Aktuelles</md-radio>
              <form class="md-layout" @submit.prevent="createNewArticle">
                <md-field>
                  <label for="Überschrift">Überschrift</label>
                  <md-input name="Überschrift" id="Überschrift" autocomplete="off" v-model="title" :disabled="sending" />
                </md-field>
              </form>
            </md-card-header>
            <md-card-content>
              <md-switch class="md-primary" v-model="vorschau">Vorschau</md-switch>
              <md-button v-if="!vorschau" title="Link hinzufügen" class="md-icon-button rightButton" @click="addLink">
                <md-icon>link</md-icon>
              </md-button>
              <md-button v-if="!vorschau" title="kuriv" class="md-icon-button rightButton" @click="addItalic">
                <md-icon>format_italic</md-icon>
              </md-button>
              <md-button v-if="!vorschau" title="fett" class="md-icon-button rightButton" @click="addBold">
                <md-icon>format_bold</md-icon>
              </md-button>
              <md-button v-if="!vorschau" title="Absatz hinzufügen" class="md-icon-button rightButton" @click="addBreak">
                <md-icon>subdirectory_arrow_left</md-icon>
              </md-button>
              <md-button v-if="!vorschau" title="Paragraph hinzufügen" class="md-icon-button rightButton" @click="addParagraph">
                <md-icon>view_headline</md-icon>
              </md-button>
              <md-button v-if="!vorschau" title="Überschrift hinzufügen" class="md-icon-button rightButton" @click="addHeadline">
                <md-icon>line_weight</md-icon>
              </md-button>

              <br>
              <div id="vorschau" v-if="vorschau">
                <span class="md-subheading" v-html="body"></span>
              </div>
              <form v-else class="md-layout" @submit.prevent="editCard">
                <md-field>
                  <label for="Inhalt">Inhalt</label>
                  <md-textarea id="inhalt" type="Inhalt" name="Inhalt" v-model="body" :disabled="sending" />
                </md-field>
              </form>
              <form class="md-layout" id="border" @submit.prevent="editCard">
                <md-field id="Beschreibung">
                  <label for="Beschreibung">Beschreibung</label>
                  <md-input name="Beschreibung" autocomplete="off" v-model="desc" :disabled="sending" />
                </md-field>
                <md-field id="upload">
                  <label>Bild hinzufügen</label>
                  <md-file v-model="fileSet" accept="image/*" id="fileUpload" placeholder="Bild hinzufügen" />
                </md-field>
              </form>
              <br>
              {{date}}
            </md-card-content>
            <md-card-actions>
              <md-button type="submit" v-if="!title && !body" class="md-secondary" @click.native="closeNewArticle" :disabled="sending">Schließen</md-button>
              <md-button type="submit" v-else class="md-secondary" @click.native="closeNewArticle" :disabled="sending">Löschen</md-button>
              <md-button type="submit" class="md-primary" @click.native="createNewArticle" :disabled="!title || !body || !type">Absenden</md-button>
            </md-card-actions>
          </md-card>
        </div>
        <br>

        <!-- Main list of articels -->
        <div class="md-layout md-gutter md-alignment-top-center">
          <span v-if="lNews.length > 0" id="CardDescription" class="md-layout-item md-size-100 md-display-3">
            Leistungen
          </span>
          <card id="card" v-bind="card" v-for="card in lNews" :key="card.articleId" :editable="true" :edit="editId == card.articleId"
            v-on:delete="prepareDelete(card.articleId)" class="md-layout-item md-xlarge-size-40 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
          />
          <span v-if="rNews.length > 0" id="CardDescription" class="md-layout-item md-size-100 md-display-3">
            Referenzen
          </span>
          <card id="card" v-bind="card" v-for="card in rNews" :key="card.articleId" :editable="true" :edit="editId == card.articleId"
            v-on:delete="prepareDelete(card.articleId)" class="md-layout-item md-xlarge-size-40 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
          />
          <span v-if="kNews.length > 0" id="CardDescription" class="md-layout-item md-size-100 md-display-3">
            Kunden
          </span>
          <card id="card" v-bind="card" v-for="card in kNews" :key="card.articleId" :editable="true" :edit="editId == card.articleId"
            v-on:delete="prepareDelete(card.articleId)" class="md-layout-item md-xlarge-size-40 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
          />
          <span v-if="aNews.length > 0" id="CardDescription" class="md-layout-item md-size-100 md-display-3">
            Aktuelles
          </span>
          <card id="card" v-bind="card" v-for="card in aNews" :key="card.articleId" :editable="true" :edit="editId == card.articleId"
            v-on:delete="prepareDelete(card.articleId)" class="md-layout-item md-xlarge-size-40 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
          />
        </div>
      <br>
      </div>

      <!-- fist visit text -->
      <md-empty-state v-if="news.length == 0 && !edit" md-icon="add" md-label="Noch keine Artikel" md-description="Erstellen Sie Ihren ersten Artikel!">
        <md-button class="md-secondary md-raised" @click="showNewArticle">Artikel erstellen</md-button>
      </md-empty-state>
      <!-- bottom corner button -->
      <md-button id="dial" class="md-fab md-primary" @click="showNewArticle">
        <md-icon>add</md-icon>
      </md-button>
      <!-- Delete Confirm Tab -->
      <md-dialog-confirm :md-active.sync="deleteActive" md-title="Wollen Sie diesen Artikel wirklich löschen?" md-confirm-text="Löschen"
        md-cancel-text="Abbrechen" @md-cancel="cancelDelete" @md-confirm="reallyDelete" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import card from "./card.vue";

export default {
  name: "admin",
  components: {
    card
  },
  data: () => ({
    fileSet: null,
    desc: null,
    deleteId: null,
    deleteActive: false,
    edit: false,
    duration: 5000,
    vorschau: false
  }),
  methods: {
    picUpload(id) {
      if (this.fileSet) {
        return this.$store
          .dispatch("postImage", {
            id,
            files: document.getElementById("fileUpload").files,
            description: this.desc
          })
          .then(() => {
            this.fileSet = null;
            this.desc = null;
          });
      } else {
        return new Promise(resolve => {
          resolve();
        });
      }
    },
    addBreak() {
      this.add(null, null, "<br>");
    },
    addLink() {
      this.add('<a href=" URL ">', "LINK TEXT", "</a>");
    },
    addBold() {
      this.add("<b>", " FETT", "</b>");
    },
    addItalic() {
      this.add("<i>", "KURSIV", "</i>");
    },
    addParagraph() {
      this.add("<p>\n", "PARAGRAPH", "\n</p>");
    },
    addHeadline() {
      this.add("<h3>", "ÜBERSCHRIFT", "</h3>");
    },
    add(string1, middle, string2) {
      var el = document.getElementById("inhalt");
      var start = el.selectionStart;
      var end = el.selectionEnd;
      middle = start === end ? middle : this.body.slice(start, end);
      if (this.body) {
        this.body = [
          this.body.slice(0, start),
          string1,
          middle,
          string2,
          this.body.slice(end)
        ].join("");
      } else {
        this.body = [string1, middle, string2].join("");
      }
    },
    checkLogin() {
      this.$store.commit("cookie", {
        token: this.$cookies.get("token"),
        name: this.$cookies.get("un")
      });
      this.$store.dispatch("getNews");
    },
    /**
     * send login credentials to the server and set cookies
     */
    newLogin() {
      this.$store.dispatch("login").then(token => {
        this.$cookies.set("token", token, 20 * 60);
        this.$cookies.set("un", this.name, 20 * 60);
        this.pw = null;
      });
    },
    /**
     * show the NEW ARTCLE CARD and scroll up
     */
    showNewArticle() {
      this.type = null;
      this.edit = true;
      this.fileSet = null;
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 20);
    },
    filterNews(filter) {
      return this.news.filter(el => el.type === filter);
    },
    /**
     * close NEW ARTCLE CARD
     */
    closeNewArticle() {
      this.newType = null;
      this.edit = false;
      this.$store.commit("title");
      this.$store.commit("body");
    },
    cancelDelete() {
      this.deleteActive = false;
      this.deleteId = null;
    },
    prepareDelete(id) {
      this.deleteActive = true;
      this.deleteId = id;
    },
    reallyDelete() {
      this.$store.dispatch("delete", this.deleteId);
      this.deleteActive = false;
    },
    /**
     * delete cookies and login creds
     */
    logout() {
      this.$cookies.set("token", null, 1);
      this.$cookies.set("un", null, 1);
      this.$store.commit("cookie", {});
    },
    /**
     * get news from server
     */
    loadNews() {
      this.$store.dispatch("getNews");
    },
    refresh() {
      this.cancelCardEdit();
      this.loadNews();
    },
    /**
     * post new article to the server, reload and hide card
     */
    createNewArticle() {
      this.$store.dispatch("new").then(res => {
        this.picUpload(res.data.articleId).then(() => {
          this.$store.dispatch("getNews");
          this.closeNewArticle();
        });
      });
    },
    /**
     * edit the content of a card by id
     */
    editCard(id) {
      this.$store.commit("newsEdit", id);
    },
    closeCard(id) {
      this.$store.commit("closeEdit");
    },

    /**
     * cancel edit of article
     */
    cancelCardEdit() {
      this.$store.commit("closeEdit");
    }
  },
  beforeMount() {
    this.checkLogin();
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
    sending() {
      return this.$store.getters.getLoading;
    },
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    /**
          @description current date formated
         */
    date() {
      moment.locale("de");
      return moment(new Date()).format("LL");
    },
    /**
          @description gets news array and converts date
         */
    news() {
      var news = this.$store.getters.getNews;
      moment.locale("de");
      news.forEach(card => {
        card.datum = moment(card.date).format("LL");
      });
      return news;
    },
    aNews() {
      return this.filterNews("aktuelles");
    },
    lNews() {
      return this.filterNews("leistungen");
    },
    kNews() {
      return this.filterNews("kunden");
    },
    rNews() {
      return this.filterNews("referenzen");
    },
    editTitle: {
      get() {
        return this.$store.getters.editTitle;
      },
      set(val) {
        this.$store.commit("editTitle", val);
      }
    },
    type: {
      get() {
        return this.$store.getters.getType;
      },
      set(val) {
        this.$store.commit("setType", val);
      }
    },
    editId() {
      return this.$store.getters.editId;
    }
  }
};
</script>


<style scoped>
#articlelayout,
#cardContainer {
  width: 98vw;
}

#articleHeader {
  max-width: 1300px;
  margin: auto;
}

#card > * {
  word-wrap: break-word;
  overflow: hidden;
}

#komplett {
  padding-bottom: 30vh;
}

#card {
  min-width: 40vw;
  /* min-width: 300px; */
  margin: 0 1% 15px 1%;
  display: block;
}

#card,
#newCard,
#loginCard {
  max-width: 1000px;
}

#newCard,
#loginCard {
  margin: auto;
  margin-top: 40px;
  padding: 5px;
}

h1 {
  text-align: center;
}

#CardDescription {
  margin-top: 10vh;
  margin-left: 20% !important;
  margin-bottom: 10px !important;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px rgb(90, 90, 90) inset;
}

#dial {
  position: fixed;
  bottom: 40px;
  right: 5px;
  margin-right: 2%;
  margin-bottom: 3vh;
  z-index: 30;
}

#refresh {
  padding-top: 11px;
}

#logout {
  padding-top: 8px;
  margin-right: 0;
  float: right;
}

textarea#inhalt {
  padding: 15px 15px 30px;
  height: 150px !important;
}

#border {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-right: 10px;
  padding-left: 10px;
}

#Beschreibung {
  margin-left: 35px;
}
</style>
