import {  computed } from 'vue'
import { useLayoutStore } from '@/store/layout'
import type { IFoldManager, FoldMode } from './types'
import { FOLD_MODE } from './constant'

// 创建Props模式的管理器
function createPropsFoldManager(
  props: { modelValue: boolean },
  emit: (event: 'update:modelValue', value: boolean) => void
): IFoldManager {
  // 使用computed来保持响应性
  const isFoldRef = computed({
    get: () => props.modelValue,
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

export function useFold(
  mode: FoldMode = FOLD_MODE.PINIA,
  props?: { modelValue: boolean },
  emit?: (event: 'update:modelValue', value: boolean) => void
): IFoldManager {

    
     // 检查是否为props模式且具备必要条件
  if (mode === FOLD_MODE.PROPS && props?.modelValue !== undefined && emit) {
    return createPropsFoldManager(props as { modelValue: boolean }, emit)
  }
  
  // 如果是props模式但条件不满足，输出提示信息
  if (mode === FOLD_MODE.PROPS) {
    console.warn('Props mode requires v-model binding, falling back to Pinia mode')
  }
  
  // 默认或降级使用Pinia模式
  return createPiniaFoldManager()
} 