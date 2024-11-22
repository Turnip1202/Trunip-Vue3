import {alovaAdapter as request}  from "@/service"
export  const login = (data:unknown)=>{
    request.post("/admin/user/login",data).then(console.log).catch(console.error)
}
