import type { FormRules } from "element-plus";
import type { AccountConfigType, PhoneConfigType } from "../types";

// 表单项类型
export type FormItemType = "text" | "password" | "email" | "tel" | "number";

// 表单验证触发方式
export type ValidateTrigger = "blur" | "change" | "submit";
// 定义表单项配置接口

// 定义表单数据接口
export interface LoginFormData {
	[key: string]: string;
}

// 定义适配器接口
export interface LoginFormAdapter {
	getData(): LoginFormData;
	setData(data: LoginFormData): void;
	validate(): Promise<{ valid: boolean; data: LoginFormData }>;
	updateConfig(config: AccountConfigType | PhoneConfigType, rules: FormRules): void;
}
