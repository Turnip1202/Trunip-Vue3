import type { FormRules } from "element-plus";

// 定义表单数据接口
export interface LoginFormData {
	[key: string]: string;
}

// 扩展的表单配置接口
export interface FormConfig {
	id: string | number;
	prop: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	clearable?: boolean;
	showPassword?: boolean;
	customClass?: string;
	style?: Partial<CSSStyleDeclaration>;
}

// 账号登录表单项
export interface IAccountItem extends FormConfig {
	prop: AccPropType;
}


// 手机登录表单项
export interface IPhoneItem extends FormConfig {
	prop: PhonePropType;
}

export type AccPropType = "username" | "password" | "code";

export type AccountConfigType = IAccountItem[];
export interface AccFormRulesType extends FormRules {
	username: { required: boolean; message: string; trigger: string }[];
	password: { required: boolean; message: string; trigger: string }[];
	code: { required: boolean; message: string; trigger: string }[];
}

export type PhonePropType = "phone" | "phoneCode";

export type PhoneConfigType = IPhoneItem[];

export interface PhoneFormRulesType extends FormRules {
	phone: { required: boolean; message: string; trigger: string }[];
	phoneCode: { required: boolean; message: string; trigger: string }[];
}


export type LoginType = "accLogin" | "phoneLogin";
