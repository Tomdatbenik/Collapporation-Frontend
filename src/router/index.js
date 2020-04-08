import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import SubNavbar from "@/components/navbar/SubNavbar.vue";
import Home from "@/views/Home.vue";
import Feed from "@/views/Feed.vue";
import Profile from "@/views/Profile/Profile.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Landing",
    component: LandingPage
  },
  {
    path: "/",
    name: "Sub",
    component: SubNavbar,
    children: [{
        path: "home",
        name: "Home",
        component: Home
      },
      {
        path: "feed",
        name: "Feed",
        component: Feed
      },
      {
        path: "/profile/:id",
        name: "profile",
        component: Profile
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;