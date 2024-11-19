<script setup lang="ts">
import { createStorage, type StorageType } from '@/utils/cache-localStorage'
import { ref, onMounted } from 'vue'

interface TestResult {
  strategy: StorageType
  results: string[]
}

// 定义所有要测试的存储策略
const strategies: Array<{
  type: StorageType
  options: Parameters<typeof createStorage>[1]
}> = [
  {
    type: 'localStorage',
    options: {
      prefix: 'test_local_',
      expire: 7 * 24 * 3600,
      encryption: true,
      encryptionKey: 'test-secret-key-2024'
    }
  },
  {
    type: 'vueuse',
    options: {
      prefix: 'test_vueuse_',
      expire: 7 * 24 * 3600
    }
  }
]

const testResults = ref<TestResult[]>([])

const addResult = (strategy: StorageType, message: string) => {
  const strategyResults = testResults.value.find(r => r.strategy === strategy)
  if (strategyResults) {
    strategyResults.results.push(`${new Date().toLocaleTimeString()} - ${message}`)
  }
}

const runStorageTests = async (strategy: StorageType, options: Parameters<typeof createStorage>[1]) => {
  const storage = createStorage(strategy, options)
  
  try {
    // 初始化结果数组
    testResults.value.push({ strategy, results: [] })

    // 清理旧数据
    await storage.clear()
    addResult(strategy, '✅ 清理存储成功')

    // 测试基本存储
    await storage.set('testString', 'Hello World')
    const stringResult = await storage.get('testString')
    addResult(strategy, `📝 字符串测试: ${stringResult === 'Hello World' ? '✅ 成功' : '❌ 失败'}`)
    addResult(strategy, `📝 实际值: ${stringResult}`)

    // 测试对象存储
    const testObj = { name: 'Test User', age: 25 }
    await storage.set('testObject', testObj)
    const objResult = await storage.get<typeof testObj>('testObject')
    addResult(strategy, `🔄 对象测试: ${
      objResult?.name === testObj.name ? '✅ 成功' : '❌ 失败'
    }`)
    addResult(strategy, `🔄 实际值: ${JSON.stringify(objResult)}`)

    // 测试过期时间
    await storage.set('expireTest', 'Will expire', 2)
    const immediate = await storage.get('expireTest')
    addResult(strategy, `⏱️ 过期测试(立即): ${immediate ? '✅ 有值' : '❌ 无值'}`)
    addResult(strategy, `⏱️ 实际值: ${immediate}`)

    // 等待过期
    addResult(strategy, '⏳ 等待2.5秒...')
    await new Promise(resolve => setTimeout(resolve, 2500))
    const expired = await storage.get('expireTest')
    addResult(strategy, `⏱️ 过期测试(2.5秒后): ${expired === null ? '✅ 已过期' : '❌ 未过期'}`)

    // 测试存储大小
    const { used, total } = storage.getSize()
    addResult(strategy, `📊 存储使用: ${used}KB / ${total}KB`)

    // 显示所有存储的键
    const keys = storage.keys()
    addResult(strategy, `🔑 存储的键: ${keys.join(', ')}`)

  } catch (error) {
    addResult(strategy, `❌ 测试出错: ${error instanceof Error ? error.message : String(error)}`)
  }
}

onMounted(async () => {
  // 依次测试每个策略
  for (const { type, options } of strategies) {
    await runStorageTests(type, options)
  }
})
</script>

<template>
  <div class="test-container">
    <h2>存储策略测试</h2>
    <div 
      v-for="result in testResults" 
      :key="result.strategy"
      class="strategy-container"
    >
      <h3>{{ result.strategy }} 策略测试结果</h3>
      <div class="results">
        <div 
          v-for="(item, index) in result.results" 
          :key="index"
          class="result-item"
          :class="{ 'error': item.includes('❌') }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.strategy-container {
  margin-bottom: 30px;
}

.strategy-container h3 {
  margin-bottom: 10px;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.results {
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
}

.result-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item.error {
  color: #d32f2f;
  background-color: #ffebee;
}
</style> 