// 默认头像
import defaultAvatar from '@/assets/default-avatar.png' 
export const defaultAvatarUrl = defaultAvatar
// 显示配置
export const displayConfig = {
  showUserInfo: true, // 是否在头像旁显示用户信息
  showRole: true, // 是否显示角色信息
  showInfoCard: true, // 是否显示信息卡片
  // 可以根据需求添加更多配置项
}

// 菜单配置
export const menuConfig = [
  {
    key: 'profile',
    label: '个人信息',
    icon: 'User',
    divided: false,
    disabled: false,
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'Setting',
    divided: true,
    disabled: false,
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: 'SwitchButton',
    divided: false,

  },
]
