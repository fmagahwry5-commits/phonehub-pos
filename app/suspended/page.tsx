'use client';

import React, { useState } from 'react';
import { Clock, Check, X, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface SuspendedInvoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  suspended_at: string;
  created_by: string;
}

export default function SuspendedInvoicesPage() {
  const [suspendedInvoices, setSuspendedInvoices] = useState<SuspendedInvoice[]>([
    {
      id: 'sus-1',
      invoice_number: 'HOLD-001',
      customer_name: 'أحمد محمد',
      items: [
        { name: 'آيفون 16 برو', quantity: 1, price: 45900 },
        { name: 'شاحن 20W', quantity: 2, price: 850 },
      ],
      total: 47600,
      suspended_at: 'اليوم 14:10',
      created_by: 'خالد علي'
    },
    {
      id: 'sus-2',
      invoice_number: 'HOLD-002',
      customer_name: 'سارة علي',
      items: [{ name: 'سامسونج S25', quantity: 1, price: 38500 }],
      total: 38500,
      suspended_at: 'اليوم 11:45',
      created_by: 'أحمد محمد'
    }
  ]);

  const completeInvoice = (invoice: SuspendedInvoice) => {
    toast.success(`تم إتمام الفاتورة ${invoice.invoice_number}`, {
      description: 'تم خصم الأصناف من المخزن بنجاح',
    });
    setSuspendedInvoices(prev => prev.filter(i => i.id !== invoice.id));
  };

  const cancelInvoice = (invoice: SuspendedInvoice) => {
    toast.info(`تم إلغاء الفاتورة ${invoice.invoice_number}`, {
      description: 'تم إرجاع الأصناف إلى المخزن',
    });
    setSuspendedInvoices(prev => prev.filter(i => i.id !== invoice.id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-semibold">الفواتير المعلقة</h1>
            <p className="text-zinc-500">الفواتير المعلقة مؤقتًا - يمكن إتمامها أو إلغاؤها</p>
          </div>
        </div>

        {suspendedInvoices.length === 0 ? (
          <div className="pos-card p-12 text-center">
            <Clock className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
            <p className="text-lg text-zinc-400">لا توجد فواتير معلقة حاليًا</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suspendedInvoices.map(invoice => (
              <div key={invoice.id} className="pos-card p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-sm text-zinc-500">{invoice.invoice_number}</div>
                    <div className="font-semibold text-xl mt-1">{invoice.customer_name}</div>
                    <div className="text-xs text-zinc-500 mt-1">معلقة منذ: {invoice.suspended_at} • بواسطة: {invoice.created_by}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold tracking-tighter">{invoice.total.toLocaleString()}</div>
                    <div className="text-xs text-zinc-400">ج.م</div>
                  </div>
                </div>

                <div className="my-5 pt-5 border-t">
                  {invoice.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <div>{item.name} × {item.quantity}</div>
                      <div>{(item.price * item.quantity).toLocaleString()} ج.م</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button 
                    onClick={() => completeInvoice(invoice)}
                    className="flex-1 pos-button bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Check className="w-4 h-4" /> إتمام البيع (خصم من المخزن)
                  </button>
                  <button 
                    onClick={() => cancelInvoice(invoice)}
                    className="flex-1 pos-button border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" /> إلغاء (إرجاع للمخزن)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
