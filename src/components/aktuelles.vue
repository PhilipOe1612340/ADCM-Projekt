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
    <!-- loading bar -->
    <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>

    <!-- main cards list -->
    <div class="md-layout md-gutter md-alignment-top-center">
      <card id="card" v-once v-cloak v-bind="card" filter="aktuelles" v-for="card in news" :key="card.articleId" class="md-layout-item md-xlarge-size-20 md-large-size-30 md-medium-size-45 md-small-size-95"
      />
    </div>
  <br>
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
    methods: {
      loadNews() {
        this.$store.dispatch("getNews");
      }
    },
    beforeMount() {
      this.loadNews();
    },
    computed: {
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

  #card {
    margin: 0px 15px 15px 15px;
  }

  #komplett {
    width: 80%;
    max-width: 1000px;
    margin: auto;
    padding: 10px;
  }
</style>
