import type { LoginConfigType } from "../types";
export const loginConfig:LoginConfigType = {
    title: "后台管理系统",
    accLogin:{
        title:"账号密码登录",
        label:"账号密码登录",
        placeholder:"请输入账号密码",
        // 忘记密码
        forgetPassword:"忘记密码",
        // 记住密码
        rememberPassword:"记住密码",
        // 立即注册
        register:"立即注册"
    },
    phoneLogin:{
        title:"手机号登录",
        label:"手机号登录",
        placeholder:"请输入手机号",
        // 获取验证码
        getCode:"获取验证码",
    },
    btnText:"立即登录"

}