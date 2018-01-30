import Vue from "vue";
import Router from "vue-router";
import leistungen from "@/components/leistungen";
import referenzen from "@/components/referenzen";
import kunden from "@/components/kunden";
import aktuelles from "@/components/aktuelles";
import kontakt from "@/components/kontakt";
import impressum from "@/components/impressum";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/",
     redirect: "/leistungen"
    },
    {
      path: "/leistungen",
      component: leistungen
    },
    {
      path: "/referenzen",
      component: referenzen
    },
    {
      path: "/kunden",
      component: kunden
    },
    {
      path: "/aktuelles",
      component: aktuelles
    },
    {
      path: "/kontakt",
      component: kontakt
    },
    {
      path: "/impressum",
      component: impressum
    }
  ]
});
