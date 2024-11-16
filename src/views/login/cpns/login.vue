<script setup lang="ts">
import type { LoginConfigType } from "../types";
import { ref } from "vue";
import LoginPanel from "./login-panel.vue";
import { accountConfig,accRules,phoneRules ,phoneConfig} from "../config";
const { config } = defineProps<{
    config:LoginConfigType
}>()
const loginConfig = ref(config)
const activeName = ref(loginConfig.value.accLogin.name);
const handleClick = (tab: { paneName: string }) => {
    console.log(tab.paneName);
    if(tab.paneName === loginConfig.value.accLogin.name){
        activeName.value = loginConfig.value.accLogin.name
    }else{
        activeName.value = loginConfig.value.phoneLogin.name
    }
}
const isRemember = ref(false);
</script>
<template>
    <div class="login-form">
        <h1 class="login-form__title">{{ loginConfig.title }}</h1>

        <div class="login-form__content">
            <el-tabs class="tabs" v-model="activeName" type="border-card" stretch @tab-click="handleClick">
                <el-tab-pane class="tabs-pane" :name="loginConfig.accLogin.name">
                    <template #label>
                        <span>{{ loginConfig.accLogin.title }}</span>
                    </template>
                    <LoginPanel :config="accountConfig" :rules="accRules" />
                </el-tab-pane>
                <el-tab-pane class="tabs-pane" :name="loginConfig.phoneLogin.name">
                    <template #label>
                        <span>{{ loginConfig.phoneLogin.title }}</span>
                    </template>
                    <LoginPanel :config="phoneConfig" :rules="phoneRules" />

                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="login-form__actions" v-if="activeName === loginConfig.accLogin.name">
            <el-checkbox v-model="isRemember">{{ loginConfig.accLogin.rememberPassword }}</el-checkbox>
            <el-link type="primary" :underline="false">{{ loginConfig.accLogin.forgetPassword }}</el-link>
        </div>
        <el-button  type="primary" class="login-form__submit">{{ loginConfig.btnText }}</el-button>
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
    .tabs{
        background-color: var(--ep-bg-color-page);
        color: var(--ep-text-color-primary);
        .tabs-pane{
            background-color: var(--ep-bg-color-page);
            color: var(--ep-text-color-primary);
        }
    }

    :deep(.el-tabs) {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        &.el-tabs--border-card {
            .el-tabs__header{
                background-color: var(--ep-bg-color-page);
            }
        }
 
    }
}
</style>