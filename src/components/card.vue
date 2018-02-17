<template>
  <div class="thumbnail">
    <div class="image" v-on:click="show = !show">
        <img  src="@/assets/leistungen.jpg" alt="Some awesome text"/>
    </div>

    <div id="demo">
  <transition name="fade">
    <md-card v-if="show">
      <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>

      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-card>
  </transition>
</div>
</div>
</template>

<script>
  export default {
    data: () => ({
      show: false
    })
  }
</script>

<style scoped>
img {
    max-width: 100%;
    display: block;
    cursor: pointer;
    border: 2px solid white;
}

.thumbnail {
    margin-top: 10%;
    margin-left: 10%;
    width: 15%;
    height: 20%;
    
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}

.image {
    width: 100%;
    height: 100%;    
}

.image img {
    -webkit-transition: all 1s ease;
  	transition: all 1s ease;
}

.image:hover img {
    -webkit-transform:scale(1.25);
     transform:scale(1.25);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>