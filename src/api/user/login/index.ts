import type { RequestBody} from "alova";
import {alovaAdapter as request}  from "@/service"
export  const login = async (data:RequestBody)=>await request.post("/admin-user/login",data);
export const getUserInfo = (id:string|null)=>request.get(`/admin-user/${id}`).then(console.log).catch(console.error)