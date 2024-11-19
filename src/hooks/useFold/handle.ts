import { computed, ref } from 'vue'
import { useLayoutStore } from '@/store/layout'
import type { IFoldManager } from './types'
import { FOLD_MODE } from './constant'

function createPropsFoldManager(
  modelValue: boolean,
  emit: (event: 'update:modelValue', value: boolean) => void
): IFoldManager {
  // 使用本地ref来跟踪状态
  const localFold = ref(modelValue)
  
  const isFoldRef = computed({
    get: () => localFold.value,
    set: (value) => {
      localFold.value = value
      emit('update:modelValue', value)
    }
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

export function useFold<T,E extends boolean | undefined>(
  mode: T,
  modelValue: E,
  emit?: (event: 'update:modelValue', value: boolean) => void
): IFoldManager {
  // Props 模式的必要条件：mode 为 PROPS、有 emit 函数
  const isValidPropsMode = mode === FOLD_MODE.PROPS && emit !== undefined&&modelValue!==undefined;
  
  if (isValidPropsMode) {
    console.warn('props mode start...')
    return createPropsFoldManager(modelValue, emit);
  }

  console.warn('pinia mode start...')
  // 不满足 Props 模式条件时，降级使用 Pinia 模式
  return createPiniaFoldManager();
} 