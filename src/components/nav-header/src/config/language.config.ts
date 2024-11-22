export interface LanguageItem {
	code: string;
	name: string;
	chineseName: string;
	icon?: string;
}

// 定义语言配置数据
const languageMap = new Map([
	["zh", { code: "zh", name: "中文", chineseName: "中文" }],
	["en", { code: "en", name: "English", chineseName: "英语" }],
	["ja", { code: "ja", name: "日本語", chineseName: "日语" }],
	["ko", { code: "ko", name: "한국어", chineseName: "韩语" }],
	["de", { code: "de", name: "Deutsch", chineseName: "德语" }],
	["es", { code: "es", name: "Español", chineseName: "西班牙语" }],
	["fr", { code: "fr", name: "Français", chineseName: "法语" }],
	["it", { code: "it", name: "Italiano", chineseName: "意大利语" }],
	["pt", { code: "pt", name: "Português", chineseName: "葡萄牙语" }],
	["ru", { code: "ru", name: "Русский", chineseName: "俄语" }],
	["tr", { code: "tr", name: "Türkçe", chineseName: "土耳其语" }],
] as const);

// 从 Map 中提取语言代码类型
export type LanguageCode = typeof languageMap extends Map<infer K, LanguageItem> ? K : never;

// 导出配置
export const LanguageConfig = {
	defaultLang: "zh" as LanguageCode,
	languages: languageMap as Map<LanguageCode, LanguageItem>,
};
