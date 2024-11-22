import type { FormInstance } from "element-plus";
import { ref } from "vue";

export function useLoginForm() {
	const formRef = ref<FormInstance>();
	const formData = ref<Record<string, string>>({});

	const validate = async () => {
		if (!formRef.value) return { valid: false, data: null };
		try {
			await formRef.value.validate();
			return { valid: true, data: formData.value };
		} catch {
			return { valid: false, data: null };
		}
	};

	return {
		formRef,
		formData,
		validate,
	};
}
