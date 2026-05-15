import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Dashboard,
  Store,
  List,
  Receipt,
  Users as UsersIcon,
  Settings
} from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: Dashboard
    },
    {
      name: 'Produtos',
      href: '/admin/products',
      icon: Store
    },
    {
      name: 'Cupons',
      href: '/admin/coupons',
      icon: List
    },
    {
      name: 'Pedidos',
      href: '/admin/orders',
      icon: Receipt
    }
  ];

  const getActiveItem = (href) => {
    const path = location.pathname;
    if (href === '/admin/dashboard' && path === '/admin/dashboard') return true;
    return path.startsWith(href) && href !== '/admin/dashboard';
  };

  return (
    <div className="flex h-screen">
      <Sidebar>
        <div className="flex flex-col h-full space-y-4 p-4">
          <div className="flex items-center space-x-3">
            <span className="h-8 w-8 bg-primary/20 rounded flex items-center justify-center">
              <Store className="h-5 w-5" />
            </span>
            <span className="font-bold text-xl">Admin Panel</span>
          </div>
          <nav className="mt-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto border-t border-border pt-4">
            <div className="flex items-center space-x-3">
              <span className="h-8 w-8 bg-primary/20 rounded flex items-center justify-center">
                <Settings className="h-5 w-5" />
              </span>
              <span className="font-bold text-xl">Configurações</span>
            </div>
          </div>
        </div>
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 bg-background border-b">
            <h1 className="text-2xl font-bold text-foreground">
              Painel Administrativo
            </h1>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;