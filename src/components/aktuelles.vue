<template>
  <div>
    <page type="Aktuelles" description="Am Puls der Zeit"></page>
  </div>
</template>

<script>
import page from "./page.vue";
export default {
  name: "aktuelles",
  metaInfo: {
    title: "Aktuelles"
  },
  components: {
    page
  }
};
</script>
