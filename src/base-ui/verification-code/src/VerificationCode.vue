<template>
  <div class="verification-code" :style="containerStyle">
    <!-- 验证码容器 -->
    <canvas
      ref="canvasRef"
      :width="config.width"
      :height="config.height"
      @click="handleRefresh"
      :style="canvasStyle"
    ></canvas>

    <!-- 刷新按钮 -->
    <el-button
      v-if="config.showRefreshButton"
      :size="config.refreshButtonSize"
      @click="handleRefresh"
      class="refresh-btn"
      :style="refreshButtonStyle"
    >
      <el-icon><Refresh /></el-icon>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import type { CSSProperties } from 'vue'

// 验证码配置接口
interface VerificationCodeConfig {
  // 基础配置
  width: number
  height: number
  length: number
  chars?: string
  expires?: number // 过期时间（毫秒）

  // 样式配置
  backgroundColor?: string
  fontColor?: string | string[]
  fontSize?: number | [number, number] // 可以是固定值或范围
  fontFamily?: string[]
  noise?: boolean // 是否添加干扰线
  noiseCount?: number
  dots?: boolean // 是否添加干扰点
  dotsCount?: number

  // 交互配置
  showRefreshButton?: boolean
  refreshButtonSize?: 'small' | 'default' | 'large'
  autoRefresh?: boolean
  refreshInterval?: number

  // 特效配置
  effects?: ('shadow' | 'glow' | 'blur')[]

  // 自定义渲染器
  customRenderer?: (
    context: CanvasRenderingContext2D,
    code: string,
    config: VerificationCodeConfig
  ) => void
}

// 默认配置
const defaultConfig: VerificationCodeConfig = {
  width: 120,
  height: 40,
  length: 4,
  chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  expires: 60000, // 60秒
  backgroundColor: '#f0f0f0',
  fontColor: ['#FF0000', '#00FF00', '#0000FF', '#FF6600', '#FF00FF'],
  fontSize: [25, 30],
  fontFamily: ['Arial', 'Verdana', 'Sans-serif'],
  noise: true,
  noiseCount: 3,
  dots: true,
  dotsCount: 30,
  showRefreshButton: true,
  refreshButtonSize: 'small',
  autoRefresh: false,
  refreshInterval: 60000,
  effects: ['shadow'],
}

// Props 定义
const props = withDefaults(defineProps<{
  config?: Partial<VerificationCodeConfig>
  modelValue?: string
}>(), {
  config: () => ({}),
})

// Emits 定义
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'refresh': [code: string]
  'verify': [isValid: boolean]
}>()

// 组件状态
const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentCode = ref<string>('')
const generatedTime = ref<number>(0)

// 合并配置
const mergedConfig = computed<VerificationCodeConfig>(() => ({
  ...defaultConfig,
  ...props.config,
}))

// 样式计算
const containerStyle = computed((): CSSProperties => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
}))

const canvasStyle = computed((): CSSProperties => ({
  cursor: 'pointer',
  borderRadius: '4px',
}))

const refreshButtonStyle = computed((): CSSProperties => ({
  marginLeft: '8px',
}))

// 工具函数
const getRandomChar = (chars: string): string => {
  return chars[Math.floor(Math.random() * chars.length)]
}

const getRandomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomColor = (colors: string | string[]): string => {
  if (Array.isArray(colors)) {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  return colors
}

// 验证码生成函数
const generateCode = (): string => {
  const { length, chars = defaultConfig.chars } = mergedConfig.value
  let code = ''
  for (let i = 0; i < length; i++) {
    code += getRandomChar(chars)
  }
  return code
}

// 绘制函数
const drawCode = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const config = mergedConfig.value

  // 清空画布
  ctx.clearRect(0, 0, config.width, config.height)

  // 设置背景
  ctx.fillStyle = config.backgroundColor!
  ctx.fillRect(0, 0, config.width, config.height)

  // 生成新验证码
  const code = generateCode()
  currentCode.value = code
  generatedTime.value = Date.now()

  // 如果有自定义渲染器，使用自定义渲染器
  if (config.customRenderer) {
    config.customRenderer(ctx, code, config)
    emit('update:modelValue', code)
    emit('refresh', code)
    return
  }

  // 绘制文字
  const fontSize = Array.isArray(config.fontSize)
    ? getRandomNum(config.fontSize[0], config.fontSize[1])
    : config.fontSize

  const chars = code.split('')
  const width = config.width / chars.length

  chars.forEach((char, i) => {
    ctx.font = `${fontSize}px ${
      config.fontFamily![Math.floor(Math.random() * config.fontFamily!.length)]
    }`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = getRandomColor(config.fontColor!)

    // 随机倾斜角度
    const rotate = (Math.random() - 0.5) * 0.3

    ctx.save()
    ctx.translate(width * (i + 0.5), config.height / 2)
    ctx.rotate(rotate)

    // 应用特效
    if (config.effects?.includes('shadow')) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 2
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
    }

    if (config.effects?.includes('glow')) {
      ctx.shadowColor = getRandomColor(config.fontColor!)
      ctx.shadowBlur = 5
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    }

    ctx.fillText(char, -fontSize! / 3, 0)
    ctx.restore()
  })

  // 绘制干扰线
  if (config.noise) {
    for (let i = 0; i < config.noiseCount!; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * config.width, Math.random() * config.height)
      ctx.lineTo(Math.random() * config.width, Math.random() * config.height)
      ctx.strokeStyle = getRandomColor(config.fontColor!)
      ctx.stroke()
    }
  }

  // 绘制干扰点
  if (config.dots) {
    for (let i = 0; i < config.dotsCount!; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * config.width,
        Math.random() * config.height,
        1,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = getRandomColor(config.fontColor!)
      ctx.fill()
    }
  }

  // 发出事件
  emit('update:modelValue', code)
  emit('refresh', code)
}

// 验证函数
const verify = (input: string): boolean => {
  const isValid = input.toLowerCase() === currentCode.value.toLowerCase()
  emit('verify', isValid)
  return isValid
}

// 刷新处理函数
const handleRefresh = () => {
  drawCode()
}

// 自动刷新定时器
let refreshTimer: number | null = null

// 监听配置变化
watch(
  () => props.config,
  () => {
    drawCode()
    setupAutoRefresh()
  },
  { deep: true }
)

// 设置自动刷新
const setupAutoRefresh = () => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer)
  }

  if (mergedConfig.value.autoRefresh) {
    refreshTimer = window.setInterval(() => {
      drawCode()
    }, mergedConfig.value.refreshInterval)
  }
}

// 生命周期钩子
onMounted(() => {
  drawCode()
  setupAutoRefresh()
})

// 暴露组件接口
defineExpose({
  refresh: handleRefresh,
  verify,
  getCurrentCode: () => currentCode.value,
})
</script>

<style scoped>
.verification-code {
  user-select: none;
}

.refresh-btn {
  transition: transform 0.3s ease;
}

.refresh-btn:hover {
  transform: rotate(180deg);
}
</style>
