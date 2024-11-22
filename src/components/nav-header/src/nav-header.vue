<script setup lang="ts">
import { useFold } from "@/hooks/useFold";
import { ArrowDown, Expand, Fold } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { type LanguageCode, LanguageConfig, type LanguageItem } from "./config/language.config";
import { FOLD_MODE } from "./constant";
import type { FoldMode, FoldModelValue, FoldProps } from "./types";

//--------折叠菜单-------
const props = withDefaults(defineProps<FoldProps>(), {
	mode: FOLD_MODE.PINIA,
	modelValue: undefined,
});

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const foldManager = useFold<FoldMode, FoldModelValue>(props.mode, props.modelValue, emit);

//-----------------------切换语言------------
// 当前语言
const currentLang = ref<LanguageCode>(LanguageConfig.defaultLang);

// 处理语言切换
const handleCommand = (langCode: LanguageCode) => {
	currentLang.value = langCode;
	const selectedLang = LanguageConfig.languages.get(langCode);
	console.log(`切换语言到: ${selectedLang?.name}`);
};

// 获取所有语言列表
const languageList = Array.from(LanguageConfig.languages.values());

// 获取当前语言项
const getCurrentLanguage = computed((): LanguageItem | undefined => {
	return LanguageConfig.languages.get(currentLang.value);
});
</script>

<template>
  <div class="nav-header">
    <div class="left">
      <el-icon @click="foldManager.toggleFold">
        <Fold v-if="foldManager.isFold" />
        <Expand v-else />
      </el-icon>
    </div>
    
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="lang-dropdown">
          {{ getCurrentLanguage?.name }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="lang in languageList" 
              :key="lang.code"
              :command="lang.code"
            >
              {{ lang.name }} ({{ lang.chineseName }})
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
  
  .left {
    .el-icon {
      font-size: 24px;
      cursor: pointer;
    }
  }
  
  .right {
    .lang-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      outline: none;
      
      .el-icon {
        margin-left: 4px;
        font-size: 12px;
      }
    }

    :deep(.el-dropdown__popper) {
      outline: none;
    }
  }
}
</style>

