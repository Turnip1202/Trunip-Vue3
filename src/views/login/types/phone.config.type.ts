// 单个配置项的类型
export interface IPhoneItem<T> {
    id?:string
    label: string
    prop: T,  // 使用字面量类型限制属性名
    placeholder: string
}
export type PhonePropType = 'phone' | 'phoneCode'

// 配置数组的类型
export type PhoneConfigType<T> = IPhoneItem<T>[] 

export interface PhoneFormRulesType {
    phone: { required: boolean; message: string; trigger: string }[];
    code: { required: boolean; message: string; trigger: string }[];
}
