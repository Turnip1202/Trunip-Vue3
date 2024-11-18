<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue';
import { useFold , type FoldMode} from '@/hooks/useFold';
import { computed } from 'vue';
import type { FoldProps } from './types';
import { FOLD_MODE } from './constant';
// 注意：这里不设置modelValue的默认值
const props = withDefaults(defineProps<FoldProps<FoldMode>>(), {
  mode: FOLD_MODE.PINIA
  // 移除 modelValue 的默认值
})
console.log(props)

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const foldManager = useFold(props.mode, props, emit);

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

