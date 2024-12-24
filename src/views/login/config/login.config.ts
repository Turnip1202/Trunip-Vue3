import type {
	AccFormRulesType,
	AccountConfigType,
	PhoneConfigType,
	PhoneFormRulesType,
	LoginType,
} from "../types";

export const accountConfig: AccountConfigType = [
	{
		id: 1,
		prop: "username",
		label: "账号",
		placeholder: "请输入账号",
		required: true,
		clearable: true,
	},
	{
		id: 2,
		prop: "password",
		label: "密码",
		placeholder: "请输入密码",
		required: true,
		showPassword: true,
	},
	{
		id: 3,
		prop: "code",
		label: "验证码",
		placeholder: "请输入验证码",
		required: true,
		showPassword: true,
	},
];

export const accRules: AccFormRulesType = {
	username: [{ required: true, message: "请输入账号", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

export const phoneConfig: PhoneConfigType = [
	{
		id: 1,
		prop: "phone",
		label: "手机号",
		placeholder: "请输入手机号",
		required: true,
		clearable: true,
	},
	{
		id: 2,
		prop: "phoneCode",
		label: "验证码",
		placeholder: "请输入验证码",
		required: true,
	},
];

export const phoneRules: PhoneFormRulesType = {
	phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
	phoneCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
};
export const loginTypes: LoginType[] = ["accLogin", "phoneLogin"];