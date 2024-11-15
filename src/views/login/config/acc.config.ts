import type { AccountConfigType, AccPropType,AccFormRulesType } from '../types'


export const accRules:AccFormRulesType = {
    name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }


const accountConfigTemp: AccountConfigType<AccPropType> = [
    {   
        label: "账号",
        prop: "name",
        placeholder: "请输入账号"
    },
    {
        label: "密码",
        prop: "password",
        placeholder: "请输入密码"
    },
    {
        label: "验证码",
        prop: "code",
        placeholder: "请输入验证码"
    }
]

// 为每个配置项添加唯一id
export const accountConfig:AccountConfigType<AccPropType> = accountConfigTemp.map(item => ({
    ...item,
    id: crypto.randomUUID()
}))
