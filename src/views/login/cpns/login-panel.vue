<script setup lang="ts">
import { ref } from 'vue'
import type { 
    AccountConfigType ,AccPropType,AccFormRulesType,
    PhoneConfigType,PhonePropType,PhoneFormRulesType} from '../types'
const {config,rules} = defineProps<{
    config:AccountConfigType<AccPropType> | PhoneConfigType<PhonePropType>  ,
    rules:AccFormRulesType | PhoneFormRulesType
}>()

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

