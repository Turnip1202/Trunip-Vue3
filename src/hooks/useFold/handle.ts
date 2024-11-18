import {  computed } from 'vue'
import { useLayoutStore } from '@/store/layout'
import type { IFoldManager } from './types'
import { FOLD_MODE } from './constant'

// 创建Props模式的管理器
function createPropsFoldManager(
  modelValue:boolean,
  emit: (event: 'update:modelValue', value: boolean) => void
): IFoldManager {
  // 使用computed来保持响应性
  const isFoldRef = computed({
    get: () => modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  
  return {
    get isFold() {
      return isFoldRef.value
    },
    toggleFold: () => {
      isFoldRef.value = !isFoldRef.value
    },
    setFold: (value: boolean) => {
      isFoldRef.value = value
    }
  }
}

// 创建Pinia模式的管理器
function createPiniaFoldManager(): IFoldManager {
  const store = useLayoutStore()
  
  return {
    get isFold() {
      return store.isFold
    },
    toggleFold: () => store.toggleFold(),
    setFold: (value: boolean) => store.setFold(value)
  }
}

export function useFold<T,E extends boolean|undefined>(
  mode:T,
  modelValue?: E,
  emit?: (event: 'update:modelValue', value: boolean) => void
): IFoldManager {

    
     // 检查是否为props模式且具备必要条件
  if (mode === FOLD_MODE.PROPS && modelValue !== undefined && emit) {
    console.log("进入props模式")
    return createPropsFoldManager(modelValue, emit)
  }
    
  // 默认或降级使用Pinia模式
  console.warn('Props mode requires v-model binding, falling back to Pinia mode')
  return createPiniaFoldManager()
} 