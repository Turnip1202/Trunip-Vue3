import { defineStore } from 'pinia';
import userApi from "@/api/user";
import { ref ,computed} from 'vue';
import type { ILoginData,ICaptchaType } from "@/types/user"
import {LSInstance} from "../storage.config"
import router from "@/router"

import {showErrors} from '@/utils'

import { v4 as uuidv4 } from 'uuid';
import { ElMessage } from 'element-plus';


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
  captchaInfo: ICaptchaType | null;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  error: any;
}

export const useUserStore = defineStore('user-login',()=>{
    const state = ref<IUserState>({
        token: null,
        userID: null,
        userInfo: null,
        loading: false,
        captchaInfo: null,
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
                ElMessage.error(showErrors(res));
                return res.success;
            }



            state.value.token = res.data.tkToken;
            state.value.userID = res.data.id;
            //存储登录数据
            LSInstance.set("loginData",res.data)
            console.log("登录数据",await LSInstance.get("loginData"))

            //获取用户信息
            const userinfo = await getUserInfo(state.value.userID);
            console.log("userinfo", userinfo);
            


            if(userinfo?.success) {
                router.push("/main");
                return userinfo;
            }

            ElMessage.error(showErrors(userinfo));


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
            console.log("获取用户信息",id);
            const userinfo = await userApi.getUserInfo(id);
            state.value.userInfo = userinfo.data;
            return userinfo;
        } catch (error) {
            state.value.error = error;
        } finally {
            state.value.loading = false;
        }
    };

    const getCaptcha = async (params: { [key: string]: unknown }) => {
        const res  =  await userApi.captchaApi.getCaptcha(params);
        state.value.captchaInfo = res.data;
        return res;
       //console.log("getCaptcha",res)
    }
   // getCaptcha({uuid:uuidv4()})

    const setCaptchaInfo = (captchaInfo: ICaptchaType) => {
        state.value.captchaInfo = captchaInfo;
    }
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
        setCaptchaInfo,
        getCaptcha,
        isAuthenticated,
        initState,
    
    }


});
