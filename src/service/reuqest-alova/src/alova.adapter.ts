import { createAlova ,type RequestBody} from "alova";
import type { paramsType } from "./types";
// import VueHook  from "alova/vue";
import adapterFetch from 'alova/fetch';

export const alovaInstance = createAlova({
    baseURL:"http://127.0.0.1:3002/api_v1",
    requestAdapter: adapterFetch(),
    responded: response => response.json(),
});

class AlovaAdapter{
    get(url:string,data?:paramsType){
        return alovaInstance.Get(url,{
            params:data
        })
    }
    post(url:string,data?:RequestBody){
        return alovaInstance.Post(url,data)
    }
}

export const alovaAdapter = new AlovaAdapter()

