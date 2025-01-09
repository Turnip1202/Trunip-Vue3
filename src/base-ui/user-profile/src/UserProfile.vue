  <script lang="ts" setup>
  import { computed } from 'vue'
  import { useUserStore } from '@/store/user' // 假设这是你的 Pinia store
  import { ArrowDown, User, Setting, SwitchButton } from '@element-plus/icons-vue'

  //导入类型
  import type { AdminUserInfoVO }from "./types"
  //导入配置
  import {defaultAvatarUrl,displayConfig,menuConfig} from './config'
  
  // 从 Pinia 获取用户信息
  const userStore = useUserStore()
  const userInfo = computed(() => {
    console.log("userInfo",userStore.state.userInfo)
    return userStore.state.userInfo
  })

  // 获取要显示的值，支持数据映射和默认值
  const getDisplayValue = (key: keyof AdminUserInfoVO) => {
    return userInfo.value![key] || '暂无'
  }
  
  // 处理菜单命令
  const handleCommand = (command: string) => {
    switch (command) {
      case 'profile':
        // 处理查看个人信息
        console.log("查看个人信息")
        break
      case 'settings':
        // 处理设置
        console.log("设置")
        break
      case 'logout':
        // 处理退出登录
        console.log("退出登录")
        userStore.logout()
        break
    }
  }
  </script>
  
<template>
    <div class="user-profile">
      <el-dropdown trigger="hover" @command="handleCommand">
        <!-- 头像和基本信息显示区域 -->
        <div class="user-profile__trigger">
          <el-avatar 
            :size="40" 
            :src="userInfo?.avatar || defaultAvatarUrl"
          />
          <!-- 根据配置显示用户信息 -->
          <div v-if="displayConfig.showUserInfo" class="user-info">
            <span class="username">{{ getDisplayValue('username') }}</span>
            <span v-if="displayConfig.showRole" class="role-name">
              {{ getDisplayValue('roleId') ==1 ? '超级管理员' : '普通用户' }}
            </span>
          </div>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
  
        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 顶部用户信息卡片 -->
            <div v-if="displayConfig.showInfoCard" class="info-card">
              <el-avatar 
                :size="60" 
                :src="userInfo?.avatar || defaultAvatarUrl"
              />
              <div class="info-card__content">
                <div class="name">{{ getDisplayValue('realName') }}</div>
                <div class="email">{{ getDisplayValue('email') }}</div>
              </div>
            </div>
            
            <!-- 动态菜单项 -->
            <template v-for="item in menuConfig" :key="item.key">
              <el-dropdown-item 
                :command="item.key"
                :disabled="item.disabled"
                :divided="item.divided"
              >
                <el-icon v-if="item.icon" class="menu-icon">
                  <component :is="item.icon" />
                </el-icon>
                {{ item.label }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </template>
 
  <style scoped lang="scss">
  .user-profile {
    display: flex;
    align-items: center;
  
    &__trigger {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 8px;
      
      .user-info {
        margin: 0 8px;
        
        .username {
          font-size: 14px;
          color: #333;
          margin-right: 8px;
        }
        
        .role-name {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  
  .info-card {
    padding: 16px;
    display: flex;
    align-items: center;
    
    &__content {
      margin-left: 12px;
      
      .name {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      
      .email {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
      }
    }
  }
  
  .menu-icon {
    margin-right: 8px;
    vertical-align: middle;
  }
  
  :deep(.el-dropdown-menu__item) {
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
  </style>