import { defineStore } from 'pinia';
import userApi from '@/api/user';
import { ref ,computed} from 'vue';
import type { ILoginData } from "@/types/user"
import {LSInstance} from "../storage.config"

interface IUserState {
  token: string | null;
  userID: string | null;
  userInfo: any;
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
        
    const login = async (data:ILoginData) => {
        state.value.loading = true;
        state.value.error = null;
        try {
            const res = await userApi.login(data);
            console.log("响应结果：",res);
   
            // state.value.token = res.data.token;
            // state.value.userID = res.data.id;
            //await getUserInfo(state.value.userID);
        } catch (error) {
            state.value.error = error;
        } finally {
            state.value.loading = false;
        }
    };
    const getUserInfo = async (id: string | null ) => {
        state.value.loading = true;
        state.value.error = null;
        try {
            const res = await userApi.getUserInfo(id);
            state.value.userInfo = res.data;
        } catch (error) {
            state.value.error = error;
        } finally {
            state.value.loading = false;
        }
    };

    const logout = () => {
        state.value.token = null;
        state.value.userInfo = null;
    }
    //使用计算属性定义getters
    const isAuthenticated = computed(() => !!state.value.token);
    return {
        ...state.value,
        login,
        logout,
        isAuthenticated
    }


});