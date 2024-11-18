import type { FOLD_MODE } from "../constant";

export type FoldProps<T> = {
  modelValue?: T;
  mode?: FoldMode;
}
export type FoldMode = typeof FOLD_MODE[keyof typeof FOLD_MODE]|undefined
export type FoldModelValue = boolean | undefined