import Vue from "vue";
import VueRouter from "vue-router";
import ViewUI from "view-design";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/archive",
    name: "Archive",
    component: () => import("@/views/Archive.vue"),
  },
  {
    path: "/post/:slug",
    name: "Post",
    component: () => import("@/views/Post.vue"),
  },
  {
    path: "/:slug",
    name: "Page",
    component: () => import("@/views/Post.vue"),
  },
  {
    path: "/friend/:slug",
    redirect: "/friend",
    name: "Friend",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(() => {
  ViewUI.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
