// Icon names can be found @:
// https://akveo.github.io/eva-icons/#/?type=fill&searchKey=gr

import { MenuItemType } from '@paljs/ui/types';

const menuItems: MenuItemType[] = [
  {
    title: 'Dashboard',
    icon: { name: 'grid' },
    link: { href: '/admin/dashboard' },
  },
  {
    title: 'Customers',
    icon: { name: 'people' },
    link: { href: '/admin/customers' },
  },
  {
    title: 'Projects',
    icon: { name: 'folder-add-outline' },
    link: { href: '/admin/projects' },
  },
  {
    title: 'Admin Users',
    icon: { name: 'shield' },
    link: { href: '/admin/users' },
  },
];

export default menuItems;
