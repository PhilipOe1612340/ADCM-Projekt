<template>
  <!-- <div id="impr">
    <h1>Impressum</h1>
    <div>
      <span>agentur_dcm</span><br />
      <span>agentur für design und photographie</span><br />
      <br />
      <span>dcm Galerie</span><br />
      <span>Schorndorfer Str. 33</span><br />
      <span>D &#8211; 70736 Fellbach</span><br />
      <span>tel +49 (0)711 300 36 91</span><br />
      <br />
      <span>Postanschrift</span><br />
      <span>Fellbacher Str. 109</span><br />
      <span>D &#8211; 70736 Fellbach</span><br />
    </div>

    <div id="legal">
      <p>Geschäftsführer: Diplom Designer Daniel Keller<br/><br />
      Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE266304641</p>
      <p>Inhaltlich Verantwortlicher gemäß § 6 MDStV: Daniel Keller</p>
      <p>Haftungshinweis: Keine Haftung für Inhalte externer links. Für die Inhalte verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.<br />Diese Erklärung gilt für alle Links auf dieser Website. Sollte Sie bemerken, dass Links unserer Website auf Seiten verweise, deren Inhalte gegen geltendes Recht verstossen, benachrichtigen Sie uns bitte sofort. Wird werden diese Links dann umgehen von unseren Seiten entfernen.</p>
    </div>
  </div>-->
</template>

<script>
export default {
  metaInfo: {
    title: "Impressum"
  },
  beforeMount() {
    window["ga-disable-UA-113316168-1"] = navigator.doNotTrack === "1";
    ga("set", "page", "/impressum");
    ga("send", "pageview");
  }
};
</script>

<style scoped>
#impr {
  width: 50%;
  min-width: 300px;
  margin: auto;
}

#legal {
  color: rgb(194, 194, 194);
  line-height: 12pt;
}
</style>
