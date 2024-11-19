export interface StorageAdapter {
  set<T>(key: string, value: T, expire?: number): Promise<boolean>
  get<T>(key: string): Promise<T | null>
  remove(key: string): Promise<boolean>
  clear(): Promise<boolean>
  keys(): string[]
  has(key: string): Promise<boolean>
  getSize(): { used: number; total: number }
} 