<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue';
import { useFold  } from '@/hooks/useFold';
import { computed } from 'vue';
import type { FoldProps,FoldMode,FoldModelValue } from './types';
// 注意：这里不设置modelValue的默认值
const props = withDefaults(defineProps<FoldProps<FoldModelValue>>(), {
  modelValue: undefined
});
console.log(props)

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const foldManager = useFold<FoldMode,FoldModelValue>(props.mode, props.modelValue, emit);

const isFold = computed(() => foldManager.isFold);
</script>
<template>
  <div class="nav-header">
    <el-icon @click="foldManager.toggleFold">
        <Fold v-if="isFold" />
        <Expand v-else />
    </el-icon>
    header
  </div>
</template>

<style scoped lang="scss">
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-icon {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>

