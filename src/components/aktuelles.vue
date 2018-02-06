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

    <div v-for="card in news" :key="card.id">
      <md-card id="card">
        <md-card-header>
          <div class="md-title">{{card.title}}</div>
        </md-card-header>

        <md-card-content>
          {{card.body}} <br>
          {{card.datum}}
        </md-card-content>
      </md-card>
      <br>
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

export default {
  name: "aktuelles",
  data: () => ({
    duration: 4000,
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
      moment.locale('de');
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
#card>*{
  word-wrap: break-word;
  overflow: hidden;
}

#komplett {
  width: 80%;
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}
</style>
