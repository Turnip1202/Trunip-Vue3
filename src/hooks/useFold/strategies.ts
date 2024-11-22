import { useLayoutStore } from "@/store/layout";
import type { Ref } from "vue";
import type { IFoldManager } from "./types";

// 定义emit类型
type EmitFn = (event: "update:modelValue", value: boolean) => void;

// Props策略
export class PropsFoldManager implements IFoldManager {
	private modelValue: Ref<boolean>;
	private emit: EmitFn;

	constructor(modelValue: Ref<boolean>, emit: EmitFn) {
		this.modelValue = modelValue;
		this.emit = emit;
	}

	get isFold(): boolean {
		return this.modelValue.value;
	}

	toggleFold() {
		this.emit("update:modelValue", !this.modelValue.value);
	}

	setFold(value: boolean) {
		this.emit("update:modelValue", value);
	}
}

// Pinia策略
export class PiniaFoldManager implements IFoldManager {
	private store = useLayoutStore();

	get isFold(): boolean {
		return this.store.isFold;
	}

	toggleFold() {
		this.store.toggleFold();
	}

	setFold(value: boolean) {
		this.store.setFold(value);
	}
}
