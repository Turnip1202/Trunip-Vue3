import type { RequestBody} from "alova";
import {alovaAdapter as request}  from "@/service"
export  const login = (data:RequestBody)=>{
    request.post("/admin/user/login",data).then(console.log).catch(console.error)
}
