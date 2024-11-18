import type { FOLD_MODE } from './constant';

// 定义折叠状态管理接口
export interface IFoldManager {
  isFold: boolean;
  toggleFold: () => void;
  setFold: (value: boolean) => void;
} 

export type FoldMode = typeof FOLD_MODE[keyof typeof FOLD_MODE]
