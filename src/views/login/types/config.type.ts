// 通用的显示和文本配置类型
interface ShowTextType {
    show: boolean
    text: string
}
interface LoginConfigType {
    title: string;
    accLogin: {
        title: string;
        label: string;
        placeholder: string;
        forgetPassword: ShowTextType;
        rememberPassword: ShowTextType;
        register: string;
    };
    phoneLogin: {
        title: string;
        label: string;
        placeholder: string;
        getCode: string;
    };
    btnText: string;
}
export type { LoginConfigType };
