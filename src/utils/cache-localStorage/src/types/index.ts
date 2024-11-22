// 存储项的配置接口
export interface StorageItem<T = unknown> {
	value: T;
	expire?: number; // 过期时间戳
}

// 存储选项接口
// export interface StorageOptions {
//   prefix?: string    // 键名前缀
//   expire?: number    // 过期时间（秒）
//   encryption?: boolean // 是否加密
//   encryptionKey?: string  // 可选的加密密钥
// }

export interface StorageOptions {
	prefix?: string;
	expire?: number;
	encryption?: boolean;
	encryptionKey?: string;
	// IndexedDB 特有选项
	dbName?: string;
	storeName?: string;
	version?: number;
}
