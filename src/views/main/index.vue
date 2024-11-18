<script setup lang="ts">
import NavMenu from '@/components/nav-menu';
import NavHeader, { FOLD_MODE } from '@/components/nav-header';
import PageContent from '@/components/page-content';
import { ref } from 'vue'
// 仅在使用props模式时需要
const isFold = ref(false)
</script>
<template>
  <div class="main-layout">
    <el-container class="main-layout-container">
      <el-aside width="210px">
        <NavMenu />
      </el-aside>
      <el-container class="main-layout-content">
        <el-header>
          <NavHeader 
            :model-value="isFold"
            :mode="FOLD_MODE.PROPS"
          />
          <!-- 使用Pinia方式 -->
          <!-- <NavHeader mode="pinia" /> -->
        </el-header>
        <el-main>
          <PageContent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  display: flex;
  min-height: 100vh;
  
  .main-layout-container {
    flex: 1;
    display: flex;
  }
  
  .main-layout-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .el-main {
    flex: 1;
    // background-color: #ace;
  }
  
  .el-aside {
    background-color: $left-menu-bg-color;
  }
  
  .el-header {
    // background-color: #ccc;
  }
}
</style>
