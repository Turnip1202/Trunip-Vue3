<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElementLoginFormAdapter } from '../adapters/login-form.adapter'
import type { 
  AccountConfigType, AccFormRulesType,
  PhoneConfigType, PhoneFormRulesType 
} from '../types'
defineOptions({
  name: 'LoginPanel'
})


const props = defineProps<{
  config: AccountConfigType | PhoneConfigType,
  rules: AccFormRulesType | PhoneFormRulesType
}>()

// 创建表单适配器实例
const formAdapter = new ElementLoginFormAdapter()

// 监听配置变化
watch(
  () => ({ config: props.config, rules: props.rules }),
  ({ config, rules }) => {
    formAdapter.updateConfig(config, rules)
  },
  { immediate: true }
)

// 表单数据
const loginData = ref(formAdapter.getData())

// 监听数据变化
watch(loginData, (newVal) => {
  formAdapter.setData(newVal)
}, { deep: true })

// 暴露适配器方法
defineExpose({ 
  validate: () => formAdapter.validate(),
  getFormData: () => formAdapter.getData()
})
</script>

<template>
  <div class="login-panel">
    <el-form :model="loginData" size="large" :rules="rules">
      <template v-for="item in config" :key="item.id">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input v-model="loginData[item.prop]"/>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

