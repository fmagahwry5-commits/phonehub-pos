'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingCart, Package, Users, 
  Clock, Printer, Settings, LogOut 
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/pos', label: 'نقطة البيع', icon: ShoppingCart },
  { href: '/inventory', label: 'المخزن', icon: Package },
  { href: '/customers', label: 'العملاء', icon: Users },
  { href: '/suppliers', label: 'الموردين', icon: Truck },
  { href: '/search', label: 'البحث الشامل', icon: Search },
  { href: '/suspended', label: 'الفواتير المعلقة', icon: Clock },
  { href: '/shifts', label: 'الورديات', icon: Clock },
  { href: '/invoice', label: 'طباعة الفواتير', icon: Printer },
  { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-white border-l border-zinc-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-8 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
            PH
          </div>
          <div>
            <div className="font-bold text-2xl tracking-tighter">PhoneHub</div>
            <div className="text-[10px] text-zinc-400 -mt-1">POS SYSTEM</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                  isActive 
                    ? 'bg-zinc-900 text-white font-medium' 
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-t bg-zinc-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">أحمد محمد</div>
            <div className="text-xs text-emerald-600">مدير النظام</div>
          </div>
          <button className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-zinc-600">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
