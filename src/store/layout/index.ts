import { defineStore } from "pinia";
import { ref } from "vue";
export const useLayoutStore = defineStore(
	"layout",
	() => {
		const isFold = ref(false);
		const toggleFold = () => {
			isFold.value = !isFold.value;
		};
		const setFold = (value: boolean) => {
			isFold.value = value;
		};
		return { isFold, toggleFold, setFold };
	},
	{
		persist: true,
	},
);
