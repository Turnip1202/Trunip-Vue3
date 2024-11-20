import type { StorageAdapter } from './adapters/storage-adapter'
import { LocalStorageAdapter } from './adapters/local-storage-adapter'
import { VueUseStorageAdapter } from './adapters/vueuse-storage-adapter'
import { IndexedDBAdapter } from './adapters/indexed-db-adapter'
import type { StorageOptions } from './types'

export type StorageType = 'localStorage' | 'vueuse' | 'indexedDB'

/**
 * 创建存储适配器实例
 * @param type - 存储类型：'localStorage' 或 'vueuse'
 * @param options - 存储配置选项
 * @returns StorageAdapter 实例
 * 
 * @example
 * // 使用 LocalStorage
 * const storage = createStorage('localStorage', {
 *   prefix: 'myApp_',
 *   expire: 3600,
 *   encryption: true
 * })
 * 
 * // 使用 VueUse Storage
 * const storage = createStorage('vueuse', {
 *   prefix: 'myApp_',
 *   expire: 3600
 * })
 */
export function createStorage(type: StorageType, options: StorageOptions = {}): StorageAdapter {
  switch (type) {
    case 'localStorage':
      return new LocalStorageAdapter(options)
    case 'vueuse':
      return new VueUseStorageAdapter(options)
    case 'indexedDB':
      return new IndexedDBAdapter(options)
    default:
      throw new Error(`Unsupported storage type: ${type}`)
  }
} 