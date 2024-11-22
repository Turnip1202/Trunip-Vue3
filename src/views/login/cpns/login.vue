<script setup lang="ts">
import { computed, ref } from "vue";
import { accRules, accountConfig, phoneConfig, phoneRules } from "../config";
import type { LoginConfigType } from "../types";
// biome-ignore lint/style/useImportType: <explanation>
import LoginPanel from "./login-panel.vue";
import {login} from "@/api/login";

type LoginType = "accLogin" | "phoneLogin";

const props = defineProps<{
	config: LoginConfigType;
}>();

const loginConfig = computed(() => ({
	...props.config,
	isAccountLogin: (name: string) => name === props.config.accLogin.name,
}));

const activeName = ref(loginConfig.value.accLogin.name);
// 修改ref的声明方式
const loginPanelRefs = ref<Record<LoginType, InstanceType<typeof LoginPanel> | null>>({
	accLogin: null,
	phoneLogin: null,
});
const isRemember = ref(false);

const changeTab = (tab: { paneName: string }) => {
	activeName.value = tab.paneName;
};

const handleSubmit = async () => {


	// 获取当前激活的面板类型
	const currentType = loginConfig.value.isAccountLogin(activeName.value)
		? "accLogin"
		: "phoneLogin";
	const currentPanel = loginPanelRefs.value[currentType];

	if (!currentPanel) {
		console.warn("未找到当前面板实例");
		return;
	}

	// 验证表单
	const { getFormData, validate } = await currentPanel;
  const data = await getFormData();
	// 验证表单
	const valid = await validate();
  console.log("valid", valid);
  console.log("data", data);
	if (!valid) return;

	// 构建登录数据
	const loginData = {
		type: activeName.value,
		remember: isRemember.value,
		...data,
	};
  login({...loginData})
	console.log("登录数据:", loginData);
};
const isAccountLogin = computed(() => loginConfig.value.isAccountLogin(activeName.value));

const loginTypes: LoginType[] = ["accLogin", "phoneLogin"];

const getConfig = (type: LoginType) => (type === "accLogin" ? accountConfig : phoneConfig);
const getRules = (type: LoginType) => (type === "accLogin" ? accRules : phoneRules);
</script>

<template>
  <div class="login-form">
    <h1 class="login-form__title">{{ loginConfig.title }}</h1>

    <div class="login-form__content">
      <el-tabs
        v-model="activeName"
        type="border-card"
        stretch
        @tab-click="changeTab"
      >
        <el-tab-pane
          v-for="type in loginTypes"
          :key="type"
          :name="loginConfig[type].name"
        >
          <template #label>
            <span>{{ loginConfig[type].title }}</span>
          </template>
          <LoginPanel
            :key="loginConfig[type].name"
            :ref="(el)=>loginPanelRefs[type]=el as InstanceType<typeof LoginPanel>"
            v-if="activeName === loginConfig[type].name"
            :config="getConfig(type)"
            :rules="getRules(type)"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div v-if="isAccountLogin" class="login-form__actions">
      <el-checkbox v-model="isRemember">
        {{ loginConfig.accLogin.rememberPassword }}
      </el-checkbox>
      <el-link type="primary" :underline="false">
        {{ loginConfig.accLogin.forgetPassword }}
      </el-link>
    </div>

    <el-button
      type="primary"
      class="login-form__submit"
      @click="handleSubmit"
    >
      {{ loginConfig.btnText }}
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  &__title {
    text-align: center;
  }

  &__content {
    border-radius: 8px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }

  &__submit {
    height: 2.5rem;
  }

  :deep(.el-tabs) {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
