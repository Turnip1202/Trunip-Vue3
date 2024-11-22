import type { FOLD_MODE } from "../constant/constant";

export type FoldMode = (typeof FOLD_MODE)[keyof typeof FOLD_MODE] | undefined;
export type FoldModelValue = boolean | undefined;

export interface FoldProps {
	modelValue?: FoldModelValue;
	mode?: FoldMode;
}
