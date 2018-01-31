<template>
  <div>
    <md-tabs md-sync-route md-alignment="centered">
      <md-tab id="tab-leistungen" md-label="leistungen" to="/leistungen">
        <router-view/>
      </md-tab>
      <md-tab id="tab-referenzen" md-label="referenzen" to="/referenzen">
        <router-view/>
      </md-tab>
      <md-tab id="tab-kunden" md-label="kunden" to="/kunden">
        <router-view/>
      </md-tab>
      <md-tab id="tab-aktuelles" md-label="aktuelles" to="/aktuelles">
        <router-view/>
      </md-tab>
    </md-tabs>

    <div class="footer">
      <router-link to="/impressum" tag="p" >Impressum</router-link>
      <router-link to="/kontakt" tag="p" >Kontakt</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#spacer{
  width: 10px;
}

.footer{
  position: relative;
  bottom: -40px;
  margin-left: 10%;
  color: white;
  font-style: normal;
  margin-bottom: 20px;
}
</style>
