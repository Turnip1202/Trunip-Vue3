

interface LoginConfigType {
	title: string;
	accLogin: {
		name: string;
		title: string;
		label: string;
		placeholder: string;
		forgetPassword: string;
		rememberPassword: string;
		register: string;
	};
	phoneLogin: {
		name: string;
		title: string;
		label: string;
		placeholder: string;
		getCode: string;
	};
	btnText: string;
}
export type { LoginConfigType };
