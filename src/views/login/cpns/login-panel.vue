<script setup lang="ts">
import type { LoginConfigType } from "../types";
import { ref } from "vue";

const { config } = defineProps<{
    config:LoginConfigType
}>()
console.log(config);
const activeName = ref("account");
const handleClick = (tab:string) => {
    console.log(tab);
}
const isRemember = ref(false);
</script>
<template>
    <div class="login-panel">
        <h1 class="panel-title">{{ config.title }}</h1>

        <div class="panel-content">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane  name="account">
                    <template #label>
                        <span>{{ config.accLogin.title }}</span>
                    </template>
                </el-tab-pane>
                <el-tab-pane name="phone">
                    <template #label>
                        <span>{{ config.phoneLogin.title }}</span>
                    </template>
                </el-tab-pane>
            </el-tabs>
            </div>
         <div class="login-control">
                <el-checkbox v-model="isRemember">{{ config.accLogin.rememberPassword }}</el-checkbox>
                <el-button type="primary">{{ config.accLogin.forgetPassword }}</el-button>
            </div>
            <el-button type="primary" class="login-btn">{{ config.btnText }}</el-button>
            </div>
</template>
<style scoped lang="scss">
.login-panel {
    width: 330px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .panel-title {
        text-align: center;
    }
    .panel-content {
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;

    }
    .login-control {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
    }
    .login-btn {
        width: 100%;
        margin-top: 10px;
    }
}
</style>