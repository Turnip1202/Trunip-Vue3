import { LocalStorage } from '../localStorage'
import type { StorageAdapter } from './storage-adapter'
import type { StorageOptions } from '../types'

export class LocalStorageAdapter implements StorageAdapter {
  private storage: LocalStorage

  constructor(options: StorageOptions = {}) {
    this.storage = new LocalStorage(options)
  }

  async set<T>(key: string, value: T, expire?: number): Promise<boolean> {
    return this.storage.set(key, value, expire)
  }

  async get<T>(key: string): Promise<T | null> {
    return this.storage.get<T>(key)
  }

  async remove(key: string): Promise<boolean> {
    return this.storage.remove(key)
  }

  async clear(): Promise<boolean> {
    return this.storage.clear()
  }

  keys(): string[] {
    return this.storage.keys()
  }

  async has(key: string): Promise<boolean> {
    return this.storage.has(key)
  }

  getSize(): { used: number; total: number } {
    return this.storage.getSize()
  }
} 