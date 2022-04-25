import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Index from "../views/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/Create.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/Edit.vue"),
    },
  ],
});

export default router;
