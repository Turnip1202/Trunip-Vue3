<script setup lang="ts">
import NavMenu from '@/components/nav-menu';
import NavHeader, { FOLD_MODE } from '@/components/nav-header';
import PageContent from '@/components/page-content';
import { computed, ref, watch } from 'vue'
import { useLayoutStore } from '@/store/layout'
import { storeToRefs } from 'pinia'
//---------------------pinia 的模式--------------------------------
const layoutStore = useLayoutStore()
// 使用 storeToRefs 保持响应性
const { isFold } = storeToRefs(layoutStore)

//决定是否折叠menu
const isFoldRef = computed({
  get(){
    return isFold.value
  },
  set(value){
    isFold.value = value
  }
})

//---------------------props 的模式--------------------------------
const changeFold = ref(isFold.value); 
watch(changeFold, (newVal) => {
  console.log('changeFold',newVal)
  isFoldRef.value = newVal
})

</script>

<template>
  <div class="main-layout">
    <el-container class="main-layout-container">
      <el-aside style="">
        <NavMenu :collapse="isFoldRef"/>
      </el-aside>
      <el-container class="main-layout-content">
        <el-header>
          <NavHeader :mode="FOLD_MODE.PROPS"/>
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
    width: auto;//宽度由内容自适应
    background-color: $left-menu-bg-color;
    overflow: hidden;
  }
  
  .el-header {
    // background-color: #ccc;
  }
}
</style>
