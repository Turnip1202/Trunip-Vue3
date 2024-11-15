<script setup lang="ts">
import type { LoginConfigType } from "../types";
import { ref,computed } from "vue";
import LoginPanel from "./login-panel.vue";
import { accountConfig,accRules,phoneRules ,phoneConfig} from "../config";
const { config } = defineProps<{
    config:LoginConfigType
}>()
const loginConfig = ref(config)
const activeName = ref("account");
const handleClick = (tab:string) => {
    console.log(tab);
}
const isRemember = ref(false);
</script>
<template>
    <div class="login-form">
        <h1 class="login-form__title">{{ loginConfig.title }}</h1>

        <div class="login-form__content">
            <el-tabs v-model="activeName" type="border-card" stretch @tab-click="handleClick">
                <el-tab-pane name="account">
                    <template #label>
                        <span>{{ loginConfig.accLogin.title }}</span>
                    </template>
                    <LoginPanel :config="accountConfig" :rules="accRules" />
                </el-tab-pane>
                <el-tab-pane name="phone">
                    <template #label>
                        <span>{{ loginConfig.phoneLogin.title }}</span>
                    </template>
                    <LoginPanel :config="phoneConfig" :rules="phoneRules" />

                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="login-form__actions">
            <el-checkbox v-model="isRemember">{{ config.accLogin.rememberPassword.text }}</el-checkbox>
            <el-link type="primary" :underline="false">{{ config.accLogin.forgetPassword.text }}</el-link>
        </div>
        <el-button type="primary" class="login-form__submit">{{ config.btnText }}</el-button>
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