import type { FormRules } from 'element-plus'
import type { 
  LoginFormData, FormConfig, LoginFormAdapter 
 } from '../types'


// Element Plus 表单适配器实现
export class ElementLoginFormAdapter implements LoginFormAdapter {
  private formData: LoginFormData = {}
  private formRules: FormRules = {}
  private formConfig: FormConfig[] = []

  constructor() {
    this.initForm()
  }

  private initForm(): void {
    this.formData = this.formConfig.reduce((acc, item) => {
      acc[item.prop] = ''
      return acc
    }, {} as LoginFormData)
  }

  getData(): LoginFormData {
    return this.formData
  }

  setData(data: LoginFormData): void {
    this.formData = data
  }

  async validate(): Promise<{ valid: boolean; data: LoginFormData }> {
    console.log("验证")
    // 实现验证逻辑
    return {
      valid: true,
      data: this.formData
    }
  }

  updateConfig(config: FormConfig[], rules: FormRules): void {
    this.formConfig = config
    this.formRules = rules
    this.initForm()
  }
} 