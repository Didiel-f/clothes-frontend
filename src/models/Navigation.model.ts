export interface MenuItemWithChild {
  title: string;
  url?: string;
  child?: MenuItemWithChild[];
}

export type Menu = MenuItemWithChild;
