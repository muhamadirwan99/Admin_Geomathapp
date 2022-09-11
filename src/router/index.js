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
      path: "/webinar",
      name: "webinar",
      component: () => import("../views/WebinarView.vue"),
    },
    {
      path: "/kisah",
      name: "kisah",
      component: () => import("../views/KisahView.vue"),
    },
    {
      path: "/editvideo",
      name: "editvideo",
      component: () => import("../views/EditVideoView.vue"),
    },
    {
      path: "/editwebinar",
      name: "editwebinar",
      component: () => import("../views/EditWebinarView.vue"),
    },
    {
      path: "/edittips",
      name: "edittips",
      component: () => import("../views/EditTipsView.vue"),
    },
    {
      path: "/editkisah",
      name: "editkisah",
      component: () => import("../views/EditKisahView.vue"),
    },
  ],
});

export default router;
