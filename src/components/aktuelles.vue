<template>
  <div>
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

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    // test() {
    //   this.msg += 5;
    // }
  },
  computed: {
    // error: {
    //   get() {
    //     return this.$store.getters.getError;
    //   },
    //   set(val) {
    //     this.$store.commit("error", val);
    //   }
    // }
  }
};
</script>
