import type { ResponseData } from "@/types/user"; 
export interface ILoginType extends ResponseData{
    data:AdminUserLoginVO
}

export interface AdminUserLoginVO{
    id:number;
    tkToken:string;
}


export interface IUserInfoType extends ResponseData{
    data:AdminUserInfoVO
}

interface AdminUserInfoVO {
    id?: number;
    username?: string;
    realName?: string;
    phone?: string;
    email?: string;
    gender?: 0 | 1 | 2;
    avatar?: string;
    birthday?: string;
    bio?: string;
    status?: 0 | 1 | 2 | 3;
    roleId?: number;
    departmentId?: number;
    registerIp?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}