import type { RequestBody} from "alova";
import {alovaAdapter as request}  from "@/service"
import type {ILoginType,IUserInfoType,CaptchaResponse,VerificationResult } from "./types"
export  const login = async(data:RequestBody)=>await request.post<ILoginType>("/admin-user/login",data);
export const getUserInfo =async(id:number|null)=>await request.get<IUserInfoType>(`/admin-user/${id}`);


export const captchaApi = {
    // 获取验证码
    getCaptcha:async(params:{[key:string]:unknown})=>await request.get<CaptchaResponse>('/admin-user/captcha',params),

    // 验证验证码
    verifyCaptcha:(data: { captchaId: string; code: string })=>request.post<VerificationResult>('/api/captcha/verify', data)
    
};
