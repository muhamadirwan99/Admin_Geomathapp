import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/video",
      name: "video",
      component: () => import("../views/VideoView.vue"),
    },
    {
      path: "/tips",
      name: "tips",
      component: () => import("../views/TipsView.vue"),
    },
    {
      path: "/edittips",
      name: "edittips",
      component: () => import("../views/EditTipsView.vue"),
    },
    {
      path: "/typo",
      name: "typo",
      component: () => import("../views/TypoView.vue"),
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("../views/EditView.vue"),
    },
    {
      path: "/editwebinar",
      name: "editwebinar",
      component: () => import("../views/EditWebinarView.vue"),
    },
    {
      path: "/webinar",
      name: "webinar",
      component: () => import("../views/WebinarView.vue"),
    },
  ],
});

export default router;
