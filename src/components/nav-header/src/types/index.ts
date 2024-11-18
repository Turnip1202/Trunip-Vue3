import type { FoldMode } from "../constant";

export type FoldProps<T> = {
  modelValue?: T;
  mode?: FoldMode;
}