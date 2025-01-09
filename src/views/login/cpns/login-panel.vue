<script setup lang="ts">
import { ref } from "vue";
import type {
	AccFormRulesType,
	AccountConfigType,
	PhoneConfigType,
	PhoneFormRulesType,
  LoginFormData,
  validatorType,
} from "../types";
import type {FormInstance} from "element-plus";

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
          <el-input v-model="loginData[item.prop]" :type="item.prop" autocapitalize="on"/>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

