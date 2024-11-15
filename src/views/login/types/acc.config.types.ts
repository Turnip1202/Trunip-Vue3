// 单个配置项的类型
export interface IAccountItem<T> {
    id?:string
    label: string
    prop: T,  // 使用字面量类型限制属性名
    placeholder: string
}
export type AccPropType = 'name' | 'password' | 'code'

// 配置数组的类型
export type AccountConfigType<T> = IAccountItem<T>[] 


export interface AccFormRulesType {
    name: { required: boolean; message: string; trigger: string }[];
    password: { required: boolean; message: string; trigger: string }[];
}