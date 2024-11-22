import { LocalStorage } from "./src/localStorage";

// 创建默认实例
export const storage = new LocalStorage();

// 导出类和类型，允许创建自定义实例
export { LocalStorage } from "./src/localStorage";
export type { StorageOptions, StorageItem } from "./src/types";
export { createStorage, type StorageType } from "./src/storage-factory";
export { IndexedDB } from "./src/indexedDB";
