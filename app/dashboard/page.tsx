'use client';

import React from 'react';
import { 
  ShoppingCart, Users, Package, Clock, 
  DollarSign, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { 
      title: "مبيعات اليوم", 
      value: "12450", 
      unit: "ج.م", 
      change: "+18%", 
      positive: true,
      icon: DollarSign 
    },
    { 
      title: "فواتير اليوم", 
      value: "34", 
      unit: "فاتورة", 
      change: "+7", 
      positive: true,
      icon: ShoppingCart 
    },
    { 
      title: "العملاء الجدد", 
      value: "12", 
      unit: "عميل", 
      change: "-2", 
      positive: false,
      icon: Users 
    },
    { 
      title: "الأصناف في المخزن", 
      value: "287", 
      unit: "صنف", 
      change: "+5", 
      positive: true,
      icon: Package 
    },
  ];

  const recentInvoices = [
    { id: "INV-2024-0891", customer: "أحمد محمد", total: 8900, type: "بيع" },
    { id: "INV-2024-0890", customer: "سارة علي", total: 12500, type: "بيع" },
    { id: "INV-2024-0889", customer: "محمد خالد", total: 3400, type: "بيع" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">لوحة التحكم</h1>
          <p className="text-zinc-500 mt-1">مرحبًا بعودتك، أحمد • {new Date().toLocaleDateString('ar-EG')}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-medium">متصل • 4 أجهزة</span>
          </div>
          <button className="pos-button pos-button-primary">
            <Clock className="w-4 h-4" /> فتح وردية جديدة
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="pos-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-zinc-500">{stat.title}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tighter">{stat.value}</span>
                    <span className="text-zinc-400 text-sm">{stat.unit}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-zinc-600" />
                </div>
              </div>
              
              <div className={`mt-4 flex items-center text-sm ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="mr-1 font-medium">{stat.change}</span>
                <span className="text-zinc-400">عن أمس</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 pos-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">آخر الفواتير</h3>
            <button className="text-sm text-zinc-500 hover:text-zinc-700">عرض الكل</button>
          </div>
          
          <div className="space-y-3">
            {recentInvoices.map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                <div>
                  <div className="font-mono text-sm text-zinc-500">{invoice.id}</div>
                  <div className="font-medium">{invoice.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{invoice.total.toLocaleString()} ج.م</div>
                  <div className="text-xs px-2 py-0.5 inline-block bg-emerald-100 text-emerald-700 rounded">{invoice.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pos-card p-6">
          <h3 className="font-semibold text-lg mb-6">إجراءات سريعة</h3>
          
          <div className="space-y-3">
            <a href="/pos" className="flex items-center gap-4 p-4 bg-zinc-900 text-white rounded-2xl hover:bg-black transition-all">
              <ShoppingCart className="w-5 h-5" />
              <div>
                <div className="font-medium">نقطة البيع</div>
                <div className="text-xs opacity-70">بيع سريع (F1)</div>
              </div>
            </a>
            
            <a href="/inventory" className="flex items-center gap-4 p-4 border border-zinc-200 hover:bg-white rounded-2xl transition-all">
              <Package className="w-5 h-5 text-zinc-600" />
              <div>
                <div className="font-medium">إدارة المخزن</div>
                <div className="text-xs text-zinc-500">إضافة أصناف + باركود</div>
              </div>
            </a>
            
            <a href="/customers" className="flex items-center gap-4 p-4 border border-zinc-200 hover:bg-white rounded-2xl transition-all">
              <Users className="w-5 h-5 text-zinc-600" />
              <div>
                <div className="font-medium">العملاء</div>
                <div className="text-xs text-zinc-500">البحث وسجل الفواتير</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}