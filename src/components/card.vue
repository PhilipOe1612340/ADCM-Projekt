<template>
  <md-card id="card">
    <md-card-header>
      <!-- title edit -->
      <div v-if="edit">
        <form class="md-layout" @submit.prevent="editCard">
          <md-field>
            <label for="Überschrift">Überschrift</label>
            <md-input name="Überschrift" id="Überschrift" autocomplete="off" v-model="editTitle" :disabled="sending" />
          </md-field>
        </form>
      </div>
      <!-- normal title -->
      <div v-else class="md-title">{{title}}</div>
    </md-card-header>

    <md-card-content>
      <!-- body edit -->
      <div v-if="edit">
        <form class="md-layout" @submit.prevent="editCard">
          <md-field>
            <label for="Inhalt">Inhalt</label>
            <md-textarea id="inhalt" type="Inhalt" name="Inhalt" v-model="editBody" :disabled="sending" />
          </md-field>
          <md-field>
            <label>Bild hochladen</label>
            <md-file v-model="fileSet" accept="image/*" id="fileUpload" :placeholder="image?image + ' ersetzen':'Bild hinzufügen'" />
          </md-field>
        </form>
      </div>
      <!-- normal body -->
      <div v-else>
        <span v-html="body"></span>
        <br> {{datum}}
      </div>
    </md-card-content>
    <md-card-media v-if="image && image.indexOf('undefined') == -1 && editId != articleId">
      <img v-if="image" :src="image" :alt="image" />
      <br>
    </md-card-media>
    <!-- buttons -->
    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div v-if="editable">
          <md-button v-if="edit" @click.native="cancelCardEdit(articleId)" class="md-primary">Abbrechen</md-button>
          <md-button v-else @click.native="editCard" class="md-primary">Bearbeiten</md-button>
          <md-button v-if="edit" @click.native="sendEdit" class="md-primary">Speichern</md-button>
          <md-button v-else @click.native="emitDelete" class="md-primary">Löschen</md-button>
        </div>
        <md-card-expand-trigger v-if="!edit">
          <md-button>mehr lesen</md-button>
        </md-card-expand-trigger>
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content>
          <span v-html="body"></span>
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<script>
  import moment from "moment";

  export default {
    name: "admin",
    props: {
      datum: {
        type: String
      },
      body: {
        type: String
      },
      title: {
        type: String
      },
      edit: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: false
      },
      image: {
        type: String
      },
      articleId: {
        validator: function (value) {
          return value > 0;
        }
      },
    },

    // [articleId,datum,body,title,edit,image],
    data: () => ({
      fileSet: null,
      deleteId: null,
      deleteActive: false,
      duration: 5000
    }),
    methods: {
      picUpload() {
        if (this.fileSet) {
          return this.$store.dispatch("postImage", {
            id: this.articleId,
            file: document.getElementById("fileUpload").files[0]
          });
        } else {
          return new Promise(resolve => {
            resolve();
          });
        }
      },
      emitDelete() {
        this.$emit("delete");
      },
      /**
          edit the content of a card by id
         */
      editCard() {
        this.$store.commit("newsEdit", this.articleId);
      },
      closeCard(id) {
        this.$store.commit("closeEdit");
      },
      /**
          send the modified content and reload
         */
      sendEdit() {
        this.$store.dispatch("edit", this.articleId).then(res => {
          this.picUpload(this.articleId).then(() => {
            this.$store.dispatch("getNews");
            this.cancelCardEdit();
          });
        });
      },
      /**
          cancel edit of article
         */
      cancelCardEdit() {
        this.$store.commit("closeEdit");
      }
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
      error() {
        return this.$store.getters.getError;
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
      editTitle: {
        get() {
          return this.$store.getters.editTitle;
        },
        set(val) {
          this.$store.commit("editTitle", val);
        }
      },
      editBody: {
        get() {
          return this.$store.getters.editBody;
        },
        set(val) {
          this.$store.commit("editBody", val);
        }
      },
      editId() {
        return this.$store.getters.editId;
      }
    }
  };

</script>
