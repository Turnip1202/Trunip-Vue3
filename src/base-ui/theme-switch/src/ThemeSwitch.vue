<script setup lang="ts">
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="theme-switch" @click="toggleDark()">
    <el-icon :size="20">
      <Moon v-if="isDark"/>
      <Sunny v-else/>
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.theme-switch {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background-color: var(--el-color-info-light-9);
    transform: scale(1.1);
  }
}

// 暗黑模式下的悬停样式
html.dark .theme-switch:hover {
  background-color: var(--el-color-info-light-3);
}
</style>