<script setup lang="ts">
// 引入依赖
import { computed, ref } from "vue";
// 引入配置
import {
  loginTypes,
 } from "../config";
// 引入类型
import type { LoginConfigType,LoginType } from "../types";
import type { ILoginData } from "@/types/user"

// biome-ignore lint/style/useImportType: <explanation>
import LoginPanel from "./login-panel.vue";
import {getConfig,getRules} from "../hooks"

// 这里引入pinia，因为请求是在pinia中发送的
import {useUserStore} from "@/store/user"


const props = defineProps<{
	config: LoginConfigType;
}>();

const loginConfig = computed(() => ({
	...props.config,
	isAccountLogin: (name: number) => name === props.config.accLogin.name,
}));

const activeName = ref<number>(loginConfig.value.accLogin.name);
// 修改ref的声明方式
const loginPanelRefs = ref<Record<LoginType, InstanceType<typeof LoginPanel> | null>>({
	accLogin: null,
	phoneLogin: null,
});
const isRemember = ref(false);

const changeTab = (tab: { paneName: number }) => {
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


  const toLogin = () => {
    	// 构建登录数据
	const loginData = {
		type: activeName.value,
		// remember: isRemember.value,
		...data,
	} as ILoginData;

  useUserStore().login(loginData)
	console.log("登录数据:", loginData);
  };

	// 验证表单
  validate()?.then(console.log).then(toLogin).catch(console.error)

//   try {
// 	const valid = await validate();
//   console.log("valid", valid);
//   console.log("data", data);
//     if(!valid){
//       return
//     }
// }
//   catch (e) {
//     console.error("error", e);
//   }




};
const isAccountLogin = computed(() => loginConfig.value.isAccountLogin(activeName.value));

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
