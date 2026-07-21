'use client';

import React, { useState } from 'react';
import { Search, Plus, Phone } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  phone: string;
  company: string;
  totalPurchases: number;
}

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const suppliers: Supplier[] = [
    { id: 's1', name: 'شركة أبل الشرق الأوسط', phone: '01098765432', company: 'Apple', totalPurchases: 124500 },
    { id: 's2', name: 'موزع سامسونج مصر', phone: '01122334455', company: 'Samsung', totalPurchases: 89500 },
    { id: 's3', name: 'مستوردات الهواتف', phone: '01233445566', company: 'Global Phones', totalPurchases: 45200 },
  ];

  const filtered = suppliers.filter(s => 
    s.name.includes(searchTerm) || s.company.includes(searchTerm) || s.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">الموردين</h1>
            <p className="text-zinc-500">إدارة الموردين وسجل المشتريات</p>
          </div>
          <button className="pos-button pos-button-primary">
            <Plus className="w-4 h-4" /> إضافة مورد جديد
          </button>
        </div>

        <div className="pos-card p-6 mb-6">
          <div className="relative">
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="ابحث باسم المورد أو الشركة أو رقم الهاتف..."
              className="pos-input pr-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="pos-card">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="p-4 text-right">المورد</th>
                <th className="p-4 text-right">الشركة</th>
                <th className="p-4 text-right">الهاتف</th>
                <th className="p-4 text-right">إجمالي المشتريات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(supplier => (
                <tr key={supplier.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4 font-medium">{supplier.name}</td>
                  <td className="p-4">{supplier.company}</td>
                  <td className="p-4 font-mono text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-zinc-400" /> {supplier.phone}
                  </td>
                  <td className="p-4 font-semibold text-right">{supplier.totalPurchases.toLocaleString()} ج.م</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
