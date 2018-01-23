<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
      <md-button class="md-accent md-raised" id="button" @click="test">Alert</md-button>
      <md-card id="card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Card withakljsdhfkajsh hover effect</div>
            <div class="md-subhead">It also have a ripple</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>

          <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    test() {
      this.msg += 5;
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
#card {
  width: 700px;
  margin-left: 500px;
}
</style>
