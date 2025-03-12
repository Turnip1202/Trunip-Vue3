import type { ResponseData } from "@/types/user"; 

export interface MenuItem {
  id: number;
  parentId: number | null;
  menuType: string; // 可以进一步细化为枚举类型
  name: string;
  icon: string | null;
  path: string | null;
  sort: number;
  permission: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface ResMenuList extends ResponseData {
  data: MenuItem[];
}