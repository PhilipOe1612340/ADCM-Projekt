<template>
  <div id="komplett">
    <md-card>
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img src="@/assets/aktuelles.jpg" alt="aktuelles">
        </md-card-media>
        <md-card-area>
          <md-card-header>
            <span class="md-title">Aktuelles</span>
            <span class="md-subhead">Am Puls der Zeit</span>
          </md-card-header>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <br>
    <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>


    <div class="md-layout md-gutter md-alignment-top-center">
      <card id="card" v-bind="card" v-for="card in news" :key="card.articleId" class="md-layout-item md-xlarge-size-20 md-large-size-30 md-medium-size-45 md-small-size-95"
      />
    </div>

    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="error" md-persistent>
      <span>{{error}}</span>
      <md-button class="md-primary" @click="loadNews">Retry</md-button>
      <md-button class="md-primary" @click="clearError">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import moment from "moment";
  import card from "./card.vue";

  export default {
    name: "aktuelles",
    components: {
      card
    },
    data: () => ({
      duration: 4000
    }),
    methods: {
      clearError() {
        this.$store.commit("clearError");
      },
      loadNews() {
        this.$store.dispatch("getNews");
      }
    },
    beforeMount() {
      this.loadNews();
    },
    computed: {
      error() {
        return this.$store.getters.getError;
      },
      loading() {
        return this.$store.getters.getLoading;
      },
      news() {
        var news = this.$store.getters.getNews;
        var i = 0;
        moment.locale("de");
        news.forEach(card => {
          card.id = i++;
          card.datum = moment(card.date).format("LL");
        });
        return news;
      }
    }
  };

</script>


<style scoped>
  #card>* {
    word-wrap: break-word;
    overflow: hidden;
  }

  #card{
    margin: 0px 15px 15px 15px;
  }

  #komplett {
    width: 80%;
    max-width: 1000px;
    margin: auto;
    padding: 10px;
  }

</style>
