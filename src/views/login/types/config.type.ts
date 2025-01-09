import type {FormItemProp} from "element-plus"
export type validatorType = (prop: FormItemProp, isValid: boolean, message: string) => void

interface LoginConfigType {
	title: string;
	accLogin: {
		name: number;
		title: string;
		label: string;
		placeholder: string;
		forgetPassword: string;
		rememberPassword: string;
		register: string;
	};
	phoneLogin: {
		name: number;
		title: string;
		label: string;
		placeholder: string;
		getCode: string;
	};
	btnText: string;
}
export type { LoginConfigType };
