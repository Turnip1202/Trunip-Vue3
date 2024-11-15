import type { PhoneConfigType, PhonePropType,PhoneFormRulesType } from '../types'
export const phoneRules:PhoneFormRulesType = {
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
  }

const phoneConfigTemp:PhoneConfigType<PhonePropType> = [
    {
        label: "手机号",
        prop: "phone",
        placeholder: "请输入手机号"
    },
    {
        label: "短信验证码",
        prop: "phoneCode",
        placeholder: "请输入短信验证码"
    }
]

// 为每个配置项添加唯一id
export const phoneConfig:PhoneConfigType<PhonePropType> = phoneConfigTemp.map(item => ({
    ...item,
    id: crypto.randomUUID()
}))
