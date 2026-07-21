'use client';

import React, { useState } from 'react';
import { Search, User, Phone, FileText } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalInvoices: number;
  totalSpent: number;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers: Customer[] = [
    { id: '1', name: 'أحمد محمد', phone: '01012345678', totalInvoices: 12, totalSpent: 124500 },
    { id: '2', name: 'سارة علي', phone: '01123456789', totalInvoices: 7, totalSpent: 68500 },
    { id: '3', name: 'محمد خالد', phone: '01234567890', totalInvoices: 4, totalSpent: 28900 },
  ];

  const filtered = customers.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm)
  );

  const demoInvoices = [
    { id: 'INV-0891', date: '2026-07-20', total: 8900, type: 'بيع' },
    { id: 'INV-0854', date: '2026-07-15', total: 12400, type: 'بيع' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">إدارة العملاء</h1>

        <div className="pos-card p-6 mb-6">
          <div className="relative">
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="ابحث باسم العميل أو رقم الهاتف..."
              className="pos-input pr-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="pos-card">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="p-4 text-right">العميل</th>
                    <th className="p-4 text-right">رقم الهاتف</th>
                    <th className="p-4 text-center">الفواتير</th>
                    <th className="p-4 text-right">إجمالي الإنفاق</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(customer => (
                    <tr key={customer.id} 
                        onClick={() => setSelectedCustomer(customer)}
                        className="border-b hover:bg-zinc-50 cursor-pointer">
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4 font-mono text-sm">{customer.phone}</td>
                      <td className="p-4 text-center">{customer.totalInvoices}</td>
                      <td className="p-4 text-right font-semibold">{customer.totalSpent.toLocaleString()} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Details */}
          <div className="pos-card p-6">
            {selectedCustomer ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-xl">{selectedCustomer.name}</div>
                    <div className="text-sm text-zinc-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {selectedCustomer.phone}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-zinc-500 mb-2">سجل الفواتير</div>
                  {demoInvoices.map(inv => (
                    <div key={inv.id} className="flex justify-between py-3 border-b text-sm">
                      <div>
                        <div className="font-mono">{inv.id}</div>
                        <div className="text-xs text-zinc-500">{inv.date}</div>
                      </div>
                      <div className="text-right">
                        <div>{inv.total.toLocaleString()} ج.م</div>
                        <div className="text-xs text-emerald-600">{inv.type}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full pos-button pos-button-secondary text-sm">
                  <FileText className="w-4 h-4" /> عرض كل الفواتير
                </button>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center text-zinc-400">
                <User className="w-10 h-10 mb-3" />
                <p>اختر عميلاً من القائمة<br />لعرض التفاصيل وسجل الفواتير</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
