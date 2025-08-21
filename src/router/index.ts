import { createRouter, createWebHashHistory, } from "vue-router";
//路由类型
import type { RouteRecordRaw,RouteLocationNormalizedLoadedGeneric } from "vue-router";

//store
import { LSInstance} from "@/store/storage.config"
import {useUserStore} from "@/store/user"

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/main",
	},
	{
		path: "/main",
		redirect: "/main/dashboard",
		component: () => import("@/views/main/index.vue"),
		children: [
			{
				path: "dashboard",
				name:"dashboard",
				component: () => import("@/views/system/dashboard/index.vue"),
			},
			{
				path:"system/users",
				name:"users",
				component: () => import("@/views/system/users/index.vue"),
			},
			{
				path:"system/menus",
				name:"menus",
				component: () => import("@/views/system/menus/index.vue"),
			},

		]

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
	},
];

const router = createRouter({
	history: createWebHashHistory("/"),
	routes,
});
router.beforeEach(async(to:RouteLocationNormalizedLoadedGeneric, from:RouteLocationNormalizedLoadedGeneric) => {
	try {
		const loginData = await getLoginData();//获取本地的登录数据
		console.log(from)

        if (isLoginPage(to)) {
            return handleLoginPageNavigation(loginData);
        } 
		return handleOtherPageNavigation(loginData);
    } catch (error) {
        console.error("无法从本地存储获取登录数据:", error);
        return "/login";
    }
});


async function getLoginData(): Promise<{ id: number, tkToken: string } | null> {
    try {

        return await LSInstance.get("loginData") as { id: number, tkToken: string };
    } catch (error) {
        console.error("Error retrieving login data:", error);
        return null;
    }
}


function isLoginPage(to: RouteLocationNormalizedLoadedGeneric): boolean {
    return to.path === "/login";
}


function handleLoginPageNavigation(loginData: { id: number, tkToken: string } | null): string | boolean {
    if (loginData?.tkToken) {
		//这里会跳转到handleOtherPageNavigation
		console.log("main")
        return "/main";
    }
    return true;
}


function handleOtherPageNavigation(loginData: { id: number, tkToken: string } | null): string | boolean {
    if (loginData?.tkToken) {
		const store = useUserStore()
		const newSatate = {...store.state}
		newSatate.userID = loginData.id;
		newSatate.token = loginData.tkToken;
		console.log("newSatate",newSatate);
		store.initState(newSatate);
		store.getUserInfo(loginData.id);
        return true;
    }
    return "/login";
}
export default router;
