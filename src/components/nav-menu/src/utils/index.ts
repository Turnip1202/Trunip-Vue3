import { markRaw } from 'vue';
import { Document, Location, Setting } from "@element-plus/icons-vue";
import type {MenuItem,ParsedMenuItem} from "../types"


export const parseMenuData = (data: MenuItem[]): ParsedMenuItem<string>[] => {
  const map = new Map<number, ParsedMenuItem<string>>();
  const result: ParsedMenuItem<string>[] = [];

  data.forEach(item => {
    if (!map.has(item.id)) {
      map.set(item.id, {
        index: item.id.toString(),
        title: item.name,
        icon: getIconComponent(item.icon),
        children: [],
        sort: item.sort,// 添加 sort 字段
        path: item.path, 
      });
    }
    const menuItem = map.get(item.id)!;

    if (item.parentId === null) {
      // Root level items
      result.push(menuItem);
    } else {
      if (!map.has(item.parentId!)) {
        map.set(item.parentId!, {
          index: item.parentId!.toString(),
          title: '', // 初始设置为空字符串
          icon: undefined, // 初始设置为 undefined
          children: [],
          sort: item.sort,// 添加 sort 字段
          path: item.path,
        });
      }
      const parent = map.get(item.parentId!)!;
      if (!parent.title) {
        // 如果父级菜单的 title 还没有设置，则设置为当前父级菜单的 name
        const parentItem = data.find(d => d.id === item.parentId);
        if (parentItem) {
          parent.title = parentItem.name;
          parent.icon = getIconComponent(parentItem.icon);
        }
      }
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(menuItem);
    }
  });

  // 排序根菜单项
  return result.sort((a, b) => a.sort - b.sort);
};

export const getIconComponent = (iconName: string | null): any => {
  switch (iconName) {
    case 'system':
      return markRaw(Setting);
    case 'user':
      return markRaw(Location);
    case 'role':
      return markRaw(Setting);
    case "setting":
      return markRaw(Document);
    default:
      return undefined;
  }
};



