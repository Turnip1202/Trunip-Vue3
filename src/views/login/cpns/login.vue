<script setup lang="ts">
import type { LoginConfigType } from "../types"
import { ref, computed } from "vue"
import LoginPanel from "./login-panel.vue"
import { accountConfig, accRules, phoneRules, phoneConfig } from "../config"

type LoginType = 'accLogin' | 'phoneLogin'

const props = defineProps<{
  config: LoginConfigType
}>()

// 使用计算属性简化配置访问
const loginConfig = computed(() => ({
  ...props.config,
  isAccountLogin: (name: string) => name === props.config.accLogin.name
}))

const activeName = ref(loginConfig.value.accLogin.name)

// 简化 tab 切换逻辑
const changeTab = (tab: { paneName: string }) => {
  activeName.value = tab.paneName
}

const loginPanelRef = ref()
const formData = ref({})

const isRemember = ref(false)
const handleSubmit = async () => {
  const { valid, data } = await loginPanelRef.value?.validate() || {}
  if (!valid) return
  
  const loginData = {
    type: activeName.value,
    remember: isRemember.value,
    ...data
  }
  
  console.log('登录数据:', loginData)
}

// 使用计算属性判断当前是否为账号登录
const isAccountLogin = computed(() => 
  loginConfig.value.isAccountLogin(activeName.value)
)

// 登录类型配置
const loginTypes: LoginType[] = ['accLogin', 'phoneLogin']

// 获取配置和规则的辅助函数
const getConfig = (type: LoginType) => type === 'accLogin' ? accountConfig : phoneConfig
const getRules = (type: LoginType) => type === 'accLogin' ? accRules : phoneRules




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