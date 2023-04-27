import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryDeatil from "@/views/CountryDeatil.vue";
import { countryService } from '@/stores/index.js'
import * as Analytics from "@/utils/analytics.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home-page',
    component: HomeView
  },
  {
    beforeEnter: async (to, from, next) => {
      countryService.initTheme();
      Analytics.page_view({
        title: "home-page",
        path: to.fullPath,
      });
      next();
    },
    path: "/home-page",
    component: () => import("@/views/Home.vue"),
    props: route => ({ region: route.query.region })
  },
  {
    beforeEnter: (to, from, next) => {
      countryService.initTheme();
      Analytics.page_view({
        title: "country-detail",
        path: to.fullPath,
      });
      next();
    },
    path: "/country-detail",
    name: 'country-detail',
    component: CountryDeatil,
    props: route => ({ countryName: route.query.countryName })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
