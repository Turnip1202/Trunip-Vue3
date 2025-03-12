<script setup lang="ts">
import { ref,computed,watch} from "vue";
import type { FormInstance } from "element-plus";
import { v4 as uuidv4 } from 'uuid';
import type{ICaptchaType} from "@/types/user"


import type {
	AccFormRulesType,
	AccountConfigType,
	PhoneConfigType,
	PhoneFormRulesType,
  LoginFormData,
  validatorType,
} from "../types";

import { useUserStore } from '@/store/user' // 假设这是你的 Pinia store


  // 从 Pinia 获取验证码信息


const inputCode = ref('')
const codeRef = ref()

//从store中获取验证码

const userStore = useUserStore();

// 使用 computed 监听 captchaInfo 的变化
const captchaInfo = computed({
  get: () => userStore.state.captchaInfo,
  set: (newCaptchaInfo: ICaptchaType) => {
    userStore.setCaptchaInfo(newCaptchaInfo);
  },
});

// 使用 watch 监听 captchaInfo 的变化并执行额外逻辑
watch(
  () => userStore.state.captchaInfo,
  (newCaptchaInfo) => {
    console.log('captchaInfo 发生变化:', newCaptchaInfo);
    captchaInfo.value = newCaptchaInfo;
    // 在这里可以执行一些额外的逻辑
  },
  { deep: true }
);

// const userStore = useUserStore()
// useUserStore().getCaptcha({uuid: uuidv4()}).then(res => {
//   captcha.value = res.data.captcha
// })



const onRefresh = () => {
  userStore.getCaptcha({uuid: uuidv4()})
  console.log('新的验证码对应的uuid:', captchaInfo.value.uuid)
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
            <div>
            <el-input v-model="loginData[item.prop]" :type="item.prop"  autocapitalize="on"/>
            <el-image @click="onRefresh" style="width: 100px; height: 50px;cursor:pointer" :src="captchaInfo?.captcha" fit="contain" />
            </div>
          </template>
          <template v-else>
            <el-input v-model="loginData[item.prop]" :type="item.prop"  autocapitalize="on"/>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

