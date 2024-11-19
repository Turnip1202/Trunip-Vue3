import { createRouter, createWebHashHistory } from "vue-router";
//路由类型
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/main",
    },
    {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/index.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "error",
        component: () => import("@/views/error/index.vue"),
     
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from) => {
    console.log(to, from);
    if(to.path!=="/login"){
        return "/login"
    }
});
export default router;
