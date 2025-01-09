import type { RequestBody} from "alova";
import {alovaAdapter as request}  from "@/service"
import type {ILoginType,IUserInfoType} from "./types"
export  const login = async(data:RequestBody)=>await request.post<ILoginType>("/admin-user/login",data);
export const getUserInfo =async(id:number|null)=>await request.get<IUserInfoType>(`/admin-user/${id}`);