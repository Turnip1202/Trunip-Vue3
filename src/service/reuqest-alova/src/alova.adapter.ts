import { createAlova ,type RequestBody} from "alova";
import type { paramsType } from "./types";
// import VueHook  from "alova/vue";
import adapterFetch from 'alova/fetch';


export const alovaInstance = createAlova({
    baseURL:import.meta.env.VITE_TURNIP_WALLPAPER_URL,
    requestAdapter: adapterFetch(),
    responded: response => response.json(),
});

class AlovaAdapter{
    get<T>(url:string,data?:paramsType){
        return alovaInstance.Get<T>(url,{
            params:data
        })
    }
    post<T>(url:string,data?:RequestBody){
        return alovaInstance.Post<T>(url,data)
    }
}

export const alovaAdapter = new AlovaAdapter()

