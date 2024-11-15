<script setup lang="ts">
import { zhCn } from "element-plus/es/locales.mjs";
</script>

<template>
 <div class="app">
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
 </div>
</template>

<style lang="scss">


</style>

