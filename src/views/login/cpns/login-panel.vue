<script setup lang="ts">
import { ref } from "vue";
import type {FormInstance} from "element-plus";
import type {
	AccFormRulesType,
	AccountConfigType,
	PhoneConfigType,
	PhoneFormRulesType,
  LoginFormData,
  validatorType,
} from "../types";

import type { VerificationCodeConfig } from '@/types'

import  VerificationCode from "@/base-ui/verification-code"
const code = ref<string>("")
const inputCode = ref('')
const codeRef = ref()

// 自定义配置
const verificationConfig: Partial<VerificationCodeConfig> = {
  width: 150,
  height: 50,
  length: 6,
  fontSize: [30, 35],
  effects: ['shadow', 'glow'],
  noise: true,
  dots: true,
  autoRefresh: true,
  refreshInterval: 30000,
  // 自定义渲染器示例

}

const onRefresh = (newCode: string) => {
  console.log('新的验证码:', newCode)
}

const onVerify = (isValid: boolean) => {
  console.log('验证结果:', isValid)
}

const checkCode = () => {
  const isValid = codeRef.value.verify(inputCode.value)
  if (isValid) {
    ElMessage.success('验证码正确')
  } else {
    ElMessage.error('验证码错误')
  }
}

const formRef = ref<FormInstance>()

const props =defineProps<{
	config: AccountConfigType | PhoneConfigType;
	rules: AccFormRulesType | PhoneFormRulesType;
}>();

// 表单数据
const loginData = ref<LoginFormData>(props.config.reduce((acc, item) => {
  acc[item.prop] = "";
  return acc;
}, {} as LoginFormData));
const  validate:validatorType =  (prop,isValid,message) => {
    console.log("被校验了",prop,isValid,message)
};
// 暴露适配器方法
defineExpose({
	validate: () => formRef.value?.validate(),
	getFormData: () => loginData.value,
});
defineOptions({
	name: "LoginPanel",
});
</script>

<template>
  <div class="login-panel">
    <el-form  ref="formRef" @validate="validate" :model="loginData" size="large" :rules="rules">
      <template v-for="item in config" :key="item.id">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.prop === 'code'">
            <VerificationCode
                v-model="code"
                :config="verificationConfig"
                @refresh="onRefresh"
                @verify="onVerify"
                ref="codeRef"
            />
          </template>
          <el-input v-model="loginData[item.prop]" :type="item.prop" autocapitalize="on"/>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

