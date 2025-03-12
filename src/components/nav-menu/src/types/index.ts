export interface MenuItem {
  id: number;
  parentId: number | null;
  menuType: string;
  name: string;
  icon: string | null;
  path: string | null;
  sort: number;
  permission: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface ParsedMenuItem<T> {
  index: T;
  title: string;
  icon?: any;
  children?: ParsedMenuItem<T>[];
  sort: number;
}

