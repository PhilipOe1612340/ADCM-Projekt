<template>
  <div>
    <md-card>
      <md-card-media-cover md-text-scrim md-ratio="16:9">
        <md-card-media md-ratio="16:9">
          <img src="@/assets/leistungen.jpg" alt="leistungen">
        </md-card-media>
        <md-card-area>
          <md-card-header>
            <span class="md-title">Leistungen</span>
            <span class="md-subhead">Gestaltung mit System</span>
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
    return {
    };
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
