<script setup lang="ts">
import { ref ,watch,defineEmits} from 'vue'
import { useLoginForm } from '@/composables/useLoginForm'

import type { 
    AccountConfigType ,AccPropType,AccFormRulesType,
    PhoneConfigType,PhonePropType,PhoneFormRulesType} from '../types'
const {config,rules} = defineProps<{
    config:AccountConfigType<AccPropType> | PhoneConfigType<PhonePropType>  ,
    rules:AccFormRulesType | PhoneFormRulesType
}>();

const { formRef, formData, validate } = useLoginForm()
const emit = defineEmits(['update:formData'])

// 暴露必要的方法
defineExpose({ validate })

// 发送数据变化事件
watch(formData, (newVal) => {
  emit("update:formData", newVal)
}, { deep: true })
const loginData = ref(
    config.reduce((acc, item) => {
        acc[item.prop] = ''
        return acc
    }, {} as Record<string, string>)
)

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

