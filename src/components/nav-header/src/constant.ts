export const FOLD_MODE = {
  PROPS: 'props',
  PINIA: 'pinia'
} as const

export type FoldMode = typeof FOLD_MODE[keyof typeof FOLD_MODE]
