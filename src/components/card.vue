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
        <md-switch class="md-primary" v-model="vorschau">Vorschau</md-switch>
        <div id="tools">
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
        </div>

        <br>
        <div id="vorschau" v-if="vorschau">
          <span class="md-subheading" v-html="editBody"></span>
        </div>
        <form v-else class="md-layout" @submit.prevent="editCard">
          <md-field>
            <label for="Inhalt">Inhalt</label>
            <md-textarea id="inhalt" type="Inhalt" name="Inhalt" v-model="editBody" :disabled="sending" />
          </md-field>
        </form>

        <md-card-media-cover v-if="images.length > 0" md-solid>
          <md-card-media md-ratio="4:3" v-touch:swipe.left="vor" v-touch:swipe.right="zurueck">
            <img class="image" v-if="images.length > currentImageID" :srcset="images[currentImageID].src + '-320.webp 320w,' +
                  images[currentImageID].src + '-640.webp 640w,' +
                  images[currentImageID].src + '-960.webp 960w'" :src="images[currentImageID].src" :alt="images[currentImageID].desc"
            />
            <md-card-area v-if="images[currentImageID].desc != null">
              <md-card-header>
                <span class="md-title">{{images[currentImageID].desc}}</span>
              </md-card-header>
            </md-card-area>
            <div v-if="images.length > 1">
              <div id="zurueck">
                <button title="vorheriges Bild" @click="zurueck">&#10094;</button>
              </div>
              <div id="vor">
                <button title="nächstes Bild" @click="vor">&#10095;</button>
              </div>
              <md-progress-bar md-mode="determinate" :md-value="((currentImageID+1)/images.length)*100"></md-progress-bar>
            </div>
          </md-card-media>
        </md-card-media-cover>

        <form class="md-layout" @submit.prevent="editCard">
          </md-field>
          <md-field id="upload">
            <label>Bild hinzufügen</label>
            <md-file v-model="fileSet" accept="image/*" id="fileUpload" placeholder="Bild hinzufügen" multiple />
          </md-field>
        </form>
      </div>
      <!-- normal body -->
      <div v-else>
        <div v-if="editable || images.length < 1">
          <span v-html="body"></span>
          <br> {{datum}}
        </div>
      </div>
    </md-card-content>
    <md-card-media-cover v-if="images.length > currentImageID && editId != articleId" md-solid>
      <md-card-media md-ratio="4:3" v-touch:swipe.left="vor" v-touch:swipe.right="zurueck">
        <img class="image" v-if="images.length > currentImageID" :srcset="images[currentImageID].src + '-320.webp 320w,' +
            images[currentImageID].src + '-640.webp 640w,' +
            images[currentImageID].src + '-960.webp 960w'" :src="images[currentImageID].src" :alt="images[currentImageID].desc"
        />
        <md-card-area v-if="images[currentImageID].desc != null">
          <md-card-header>
            <span class="md-title">{{images[currentImageID].desc}}</span>
          </md-card-header>
        </md-card-area>
        <div v-if="images.length > 1">
          <div id="zurueck">
            <button title="vorheriges Bild" @click="zurueck">&#10094;</button>
          </div>
          <div id="vor">
            <button title="nächstes Bild" @click="vor">&#10095;</button>
          </div>
          <md-progress-bar md-mode="determinate" :md-value="((currentImageID+1)/images.length)*100"></md-progress-bar>
        </div>
      </md-card-media>
    </md-card-media-cover>

    <!-- buttons -->
    <md-card-expand id="buttons">
      <md-card-actions md-alignment="space-between">
        <div v-if="editable">
          <md-button v-if="edit" @click.native="cancelCardEdit(articleId)" class="md-primary">Abbrechen</md-button>
          <md-button v-else @click.native="editCard" class="md-primary">Bearbeiten</md-button>
          <md-button v-if="edit" @click.native="sendEdit" class="md-primary">Speichern</md-button>
          <md-button v-else @click.native="emitDelete" class="md-primary">Löschen</md-button>
        </div>
        <md-card-expand-trigger v-if="!editable && images.length > 0">
          <md-button>mehr lesen</md-button>
        </md-card-expand-trigger>
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content>
          <span v-html="body"></span>
          <br> {{datum}}
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
      images: {
        type: Array,
        default: []
      },
      articleId: {
        validator: function (value) {
          return value > 0;
        }
      },
      type: {
        type: String,
        default: "aktuelles"
      }
    },

    // [articleId,datum,body,title,edit,image],
    data: () => ({
      currentImageID: 0,
      fileSet: null,
      deleteId: null,
      deleteActive: false,
      duration: 5000,
      vorschau: false
    }),
    methods: {
      picUpload() {
        if (this.fileSet) {
          return this.$store
            .dispatch("postImage", {
              id: this.articleId,
              files: document.getElementById("fileUpload").files
            })
            .then(() => {
              this.fileSet = null;
            });
        } else {
          return new Promise(resolve => {
            resolve();
          });
        }
      },
      addBreak() {
        this.add("", "", "<br>")
      },
      addLink() {
        this.add("<a href=\"  http://www.example.com  \" target=\"_blank\" rel=\"noopener\">", "  LINK TEXT  ", "</a>")
      },
      addBold() {
        this.add("<b>", "  FETT  ", "</b>")
      },
      addItalic() {
        this.add("<i>", "  KURSIV  ", "</i>")
      },
      addParagraph() {
        this.add("<p>\n", "    PARAGRAPH", "\n</p>")
      },
      addHeadline() {
        this.add("<h3>", "  ÜBERSCHRIFT  ", "</h3>")
      },
      add(string1, middle, string2) {
        var el = document.getElementById("inhalt");
        var start = el.selectionStart;
        var end = el.selectionEnd;
        middle = start === end ? middle : this.editBody.slice(start, end);
        this.editBody = [this.editBody.slice(0, start), string1, middle, string2, this.editBody.slice(end)].join('');
        el.focus();

        setTimeout(() => {
          el.setSelectionRange(start + string1.length, start + string1.length + middle.length);
        }, 100)
      },
      vor() {
        this.currentImageID += 1;
        this.currentImageID = this.currentImageID % this.images.length;
      },
      zurueck() {
        this.currentImageID -= 1;
        this.currentImageID =
          this.currentImageID < 0 ? this.images.length - 1 : this.currentImageID;
      },
      loeschen() {
        this.$store.dispatch("rmImage", this.currentImageID).then(() => {
          this.images.splice(this.currentImageID, 1);
          this.vor();
        });
      },
      emitDelete() {
        this.$emit("delete");
      },
      /**
       * edit the content of a card by id
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

<style>
  #vorschau {
    border: 1px solid transparent;
    border-color: var(--md-theme-default-primary, #7cb9ff);
    padding: 10px;
    border-radius: 3px;
    min-height: 110px;
  }

  button {
    z-index: 100;
  }

  #vor {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  #zurueck {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  #loeschen {
    position: absolute;
    padding: 0;
    right: 0px;
    top: 25px;
    color: red;
  }

  #loeschen>*,
  #vor>*,
  #zurueck>* {
    text-shadow: rgb(151, 151, 151) 0px 0px 15px;
    font-size: 20pt;
    z-index: 50s;
    margin: 0;
    padding-bottom: 4px;
    padding-left: 4px;
    width: 45px;
    height: 45px;
    border: 0;
    background: rgba(215, 234, 252, 0.664);
    box-shadow: none;
    border-radius: 3px;
  }

  #vor>*:hover,
  #zurueck>*:hover {
    text-shadow: none;
    box-shadow: 0px 0px 10px black;
    background: rgba(215, 234, 252, 0.5);
  }

  #loeschen>*:hover {
    text-shadow: none;
    box-shadow: 0px 0px 10px black;
    background: rgb(255, 43, 43);
    color: black;
  }

  .rightButton {
    float: right;
  }
  .md-switch{
    margin-right: 100px;
  }

  #tools {
    display: inline-block;
    position: relative;
    top: 10px;
  }

  #tools > * {
    margin-left: 0;
    margin-right: 0;
  }

</style>
