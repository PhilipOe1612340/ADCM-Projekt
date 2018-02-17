import Vue from "vue";
import Router from "vue-router";
const leistungen = () => import("@/components/leistungen");
const referenzen = () => import("@/components/referenzen");
const kunden = () => import("@/components/kunden");
const aktuelles = () => import("@/components/aktuelles");
const kontakt = () => import("@/components/kontakt");
const impressum = () => import("@/components/impressum");
const admin = () => import("@/components/admin");
const card = () => import("@/components/card");

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
    },
    {
      path: "/admin",
      component: admin
    },
    {
      path: "/card",
      component: card
    }
  ]
});
