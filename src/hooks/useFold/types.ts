// 定义折叠状态管理接口
export interface IFoldManager {
  isFold: boolean;
  toggleFold: () => void;
  setFold: (value: boolean) => void;
} 