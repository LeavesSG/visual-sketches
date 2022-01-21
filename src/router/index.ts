import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sand-dance",
    name: "SandDance",
    component: () =>
      import(/* webpackChunkName: "sanddance" */ "../views/ViewSandDance.vue"),
  },
  {
    path: "/particles-globe",
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
    path: "/bubble-wall",
    name: "bubble-wall",
    component: () =>
      import(
        /* webpackChunkName: "imageDanmaku" */ "../sketches/bubble-wall/BubbleWall.vue"
      ),
  },
  {
    path: "/filter-effect",
    name: "filter-effect",
    component: () =>
      import(
        /* webpackChunkName: "filtereffect" */ "../sketches/filter-effect/filter-effect.vue"
      ),
  },
  {
    path: "/algs-visualize",
    name: "Algorithm Visualization",
    component: () =>
      import(
        /* webpackChunkName: "algs-visualize" */ "../sketches/algorithm-visualize/algs-visualize.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
