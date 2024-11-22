<script setup lang="ts">
import ThemeSwitch from "@/base-ui/theme-switch";
import { zhCn } from "element-plus/es/locales.mjs";
</script>

<template>
  <div class="app">
    <el-config-provider :locale="zhCn" >
      <ThemeSwitch />
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style lang="scss">
.app{
  height: 100%;
}
</style>

