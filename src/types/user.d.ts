export interface ILoginData {
    type: number;
    remember: boolean;
    username: string;
    password: string;
    code: string;
}


export interface ResponseData {
    code: number;
    data: any;
    msg: string;
    path: null | string;
    success: boolean;
    timestamp: string;
    errors: null | any;
}
export type ICaptchaType = {
    uuid: string;
    captcha: string;
    type: string;
};





export interface VerificationCodeConfig {
    // 基础配置
    width: number
    height: number
    length: number
    chars?: string
    expires?: number // 过期时间（毫秒）

    // 样式配置
    backgroundColor?: string
    fontColor?: string | string[]
    fontSize?: number | [number, number] // 可以是固定值或范围
    fontFamily?: string[]
    noise?: boolean // 是否添加干扰线
    noiseCount?: number
    dots?: boolean // 是否添加干扰点
    dotsCount?: number

    // 交互配置
    showRefreshButton?: boolean
    refreshButtonSize?: 'small' | 'default' | 'large'
    autoRefresh?: boolean
    refreshInterval?: number

    // 特效配置
    effects?: ('shadow' | 'glow' | 'blur')[]

    // 自定义渲染器
    customRenderer?: (
        context: CanvasRenderingContext2D,
        code: string,
        config: VerificationCodeConfig
    ) => void
}
