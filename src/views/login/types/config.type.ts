interface LoginConfigType {
    title: string;
    accLogin: {
        title: string;
        label: string;
        placeholder: string;
        forgetPassword: string;
        rememberPassword: string;
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
