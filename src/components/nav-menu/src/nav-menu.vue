<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const props = defineProps<{
  collapse: boolean
}>()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="nav-menu">
    <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="collapse"
    :collapse-transition="true"
    @open="handleOpen"
    @close="handleClose"
    text-color="#b7bdc3"
    active-text-color="#0a60bd"
    background-color="#0c2135"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.nav-menu{
  .el-menu{
    border-right: none;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 210px;
  }

  .el-menu-item:hover{
    background-color: #0a60bd;
    color: #fff;
  }
  .el-menu-item.is-active{
    color: #fff !important;
    background-color: #0a60bd !important;
  }

.el-menu--collapse {
    width: 64px;
  }
}




</style>
