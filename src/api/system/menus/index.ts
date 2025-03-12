import  type{ResMenuList} from "./types"
import {alovaAdapter as request}  from "@/service"
export  const getMenus = async()=>await request.get<ResMenuList>("/admin-menus/getMenus");

