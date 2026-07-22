'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, Wrench, Package } from 'lucide-react';

export default function ReportsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState('');

  // بيانات تجريبية
  const summary = {
    totalSales: 124500,
    totalPurchases: 89500,
    netProfit: 124500 - 89500,
    accessories: 18500,
    repairs: 12400,
    installments: 32000,
  };

  const customers = [
    { id: '1', name: 'أحمد محمد', totalSales: 89500, totalPurchases: 0, balance: 89500 },
    { id: '2', name: 'سارة علي', totalSales: 35000, totalPurchases: 12000, balance: 23000 },
    { id: '3', name: 'محمد خالد', totalSales: 0, totalPurchases: 45000, balance: -45000 },
  ];

  const customerTransactions = [
    { date: '2026-07-20', type: 'بيع', amount: 45900, description: 'آيفون 16 برو' },
    { date: '2026-07-18', type: 'بيع', amount: 18500, description: 'شاحن + كفر' },
    { date: '2026-07-15', type: 'شراء', amount: 12000, description: 'قطع غيار' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">التقارير المالية</h1>

        {/* ملخص مالي */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="pos-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">إجمالي المبيعات</p>
                <p className="text-3xl font-semibold mt-1">{summary.totalSales.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="pos-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">إجمالي المشتريات</p>
                <p className="text-3xl font-semibold mt-1">{summary.totalPurchases.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="pos-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">الصافي</p>
                <p className={`text-3xl font-semibold mt-1 ${summary.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {summary.netProfit.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-zinc-600" />
            </div>
          </div>

          <div className="pos-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">الإكسسوارات</p>
                <p className="text-3xl font-semibold mt-1">{summary.accessories.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* تفاصيل إضافية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="pos-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="text-orange-600" />
              <h3 className="font-semibold">إجمالي الصيانات</h3>
            </div>
            <p className="text-3xl font-semibold">{summary.repairs.toLocaleString()} ج.م</p>
          </div>

          <div className="pos-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="text-purple-600" />
              <h3 className="font-semibold">إجمالي الأقساط</h3>
            </div>
            <p className="text-3xl font-semibold">{summary.installments.toLocaleString()} ج.م</p>
          </div>
        </div>

        {/* كشف حساب العملاء */}
        <div className="pos-card p-6">
          <h3 className="font-semibold text-xl mb-6">كشف حساب العملاء</h3>

          <div className="mb-6">
            <select 
              className="pos-input max-w-xs"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">اختر عميلاً</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <table className="w-full">
            <thead>
              <tr className="table-header border-b">
                <th className="p-4 text-right">العميل</th>
                <th className="p-4 text-right">إجمالي المبيعات</th>
                <th className="p-4 text-right">إجمالي المشتريات</th>
                <th className="p-4 text-right">الرصيد</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4 font-medium">{customer.name}</td>
                  <td className="p-4 text-emerald-600">{customer.totalSales.toLocaleString()} ج.م</td>
                  <td className="p-4 text-red-600">{customer.totalPurchases.toLocaleString()} ج.م</td>
                  <td className={`p-4 font-semibold ${customer.balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {customer.balance.toLocaleString()} ج.م
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* تفاصيل كشف الحساب */}
          {selectedCustomer && (
            <div className="mt-8 border-t pt-6">
              <h4 className="font-semibold mb-4">تفاصيل المعاملات</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100">
                    <th className="p-3 text-right">التاريخ</th>
                    <th className="p-3 text-right">النوع</th>
                    <th className="p-3 text-right">الوصف</th>
                    <th className="p-3 text-right">المبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  {customerTransactions.map((tx, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-3">{tx.date}</td>
                      <td className="p-3">{tx.type}</td>
                      <td className="p-3">{tx.description}</td>
                      <td className="p-3 font-semibold">{tx.amount.toLocaleString()} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}