import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sanddance",
    name: "SandDance",
    component: () =>
      import(/* webpackChunkName: "sanddance" */ "../views/ViewSandDance.vue"),
  },
  {
    path: "/particlesglobe",
    name: "ParticlesGlobe",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "particlesglobe" */ "../views/ViewParticleGlobe.vue"
      ),
  },
  {
    path: "/imageDanmaku",
    name: "imageDanmaku",
    component: () =>
      import(
        /* webpackChunkName: "imageDanmaku" */ "../sketches/bubble-wall/BubbleWall.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
