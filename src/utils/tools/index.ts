export * from "./logger"
export const showErrors = (errorInfo: any) => {
    const errorStr = `登录失败：${errorInfo?.msg}---${errorInfo?.errors??""}`

      if(errorInfo?.errors===null){
          return errorStr.split("---").shift();		
      }
      return errorStr;
}
  


