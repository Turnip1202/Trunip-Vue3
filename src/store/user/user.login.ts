import { defineStore } from 'pinia';
import userApi from '@/api/user';
import { ref ,computed} from 'vue';
import type { ILoginData } from "@/types/user"
import {LSInstance} from "../storage.config"
import router from "@/router"

// 提取 Promise 中的实际类型
type UnwrapPromise<T> = T extends Promise<infer U>? U : never;


type IUserInfoType = UnwrapPromise<ReturnType<typeof userApi.getUserInfo>>;


// 提取 data 的类型
type IUserInfoVO = IUserInfoType["data"];


interface IUserState {
  token: string | null;
  userID: number| null;
  userInfo: IUserInfoVO| null;
  loading: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  error: any;
}

export const useUserStore = defineStore('user-login',()=>{
    const state = ref<IUserState>({
        token: null,
        userID: null,
        userInfo: null,
        loading: false,
        error: null
    });  
    const initState = (initialState: Partial<IUserState>) => {
        state.value = {
            ...state.value,
            ...initialState
        };
    };
        
    const login = async (data:ILoginData) => {
        state.value.loading = true;
        state.value.error = null;
        try {
            const res = await userApi.login(data);
            console.log("loginData",res);
            if(!res.success) {
                ElMessage.error(`登录失败：${res.msg}---${res.errors}`);
                return res.success;
            }



            state.value.token = res.data.tkToken;
            state.value.userID = res.data.id;
            LSInstance.set("loginData",res.data)
            
            console.log(await LSInstance.get("loginData"))
   

            const userinfo = await getUserInfo(state.value.userID);
            console.log("sss",userinfo);
            if(!userinfo?.success) {
                router.push("/main");
                return userinfo;
            }
            ElMessage.error(`登录失败：${userinfo.msg}---${userinfo.errors}`);
            

        } catch (error) {
            state.value.error = error;
        } finally {
            state.value.loading = false;
        }
    };
    const getUserInfo = async (id: number | null ) => {
        state.value.loading = true;
        state.value.error = null;
        try {
            const userinfo = await userApi.getUserInfo(id);
            state.value.userInfo = userinfo.data;
            console.log("userinfo",userinfo);
            return userinfo;
        } catch (error) {
            state.value.error = error;
        } finally {
            state.value.loading = false;
        }
    };

    const logout = () => {
        router.push("/login");
        LSInstance.clear();
        state.value.token = null;
        state.value.userInfo = null;

    }
    //使用计算属性定义getters
    const isAuthenticated = computed(() => !!state.value.token);
    return {
        state,
        login,
        logout,
        getUserInfo,
        isAuthenticated,
        initState
    }


});