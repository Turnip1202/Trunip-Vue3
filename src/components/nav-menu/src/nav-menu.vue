<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type {  ParsedMenuItem } from "./types"
import { parseMenuData } from './utils';
import {getMenus} from "@/api/system"

const props = defineProps<{
  collapse: boolean;
}>();


const menuData = ref<ParsedMenuItem<string>[]>([]);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

onMounted( async() => {
  const backendData =await getMenus();
  menuData.value = parseMenuData(backendData.data);
});
</script>

<template>
  <div class="nav-menu">
    <el-menu
      router
      class="el-menu-vertical"
      :collapse="collapse"
      :collapse-transition="true"
      @open="handleOpen"
      @close="handleClose"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      background-color="#0c2135"
    >
      <template v-for="item in menuData" :key="item.index">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.index">
          <template #title>
            <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
<!--          <el-menu-item-group>-->
            <el-menu-item v-for="child in item.children"  :key="child.index" :index="child.path">
             {{ child.title}}-{{child.path }}
            </el-menu-item>
<!--          </el-menu-item-group>-->
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.nav-menu {
  .el-menu {
    border-right: none;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 210px;
  }

  .el-menu-item:hover {
    background-color: #0a60bd;
    color: #fff;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu--collapse {
    width: 64px;
  }
}
</style>



