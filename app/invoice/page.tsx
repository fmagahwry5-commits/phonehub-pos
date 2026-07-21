'use client';

import React from 'react';
import { Printer, ArrowLeft } from 'lucide-react';

interface InvoiceData {
  invoice_number: string;
  type: 'sale' | 'purchase';
  date: string;
  customer_name: string;
  customer_phone: string;
  items: Array<{
    name: string;
    barcode: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payment_method: string;
  created_by: string;
}

export default function InvoicePrintPage() {
  // Demo invoice data
  const invoice: InvoiceData = {
    invoice_number: "INV-2026-0891",
    type: "sale",
    date: "2026-07-21 14:35",
    customer_name: "أحمد محمد",
    customer_phone: "01012345678",
    items: [
      { name: "آيفون 16 برو", barcode: "1234567890123", quantity: 1, price: 45900, total: 45900 },
      { name: "شاحن أصلي 20W", barcode: "1122334455667", quantity: 1, price: 850, total: 850 },
    ],
    subtotal: 46750,
    discount: 750,
    tax: 0,
    total: 46000,
    payment_method: "نقدي",
    created_by: "أحمد محمد (كاشير)"
  };

  const shopInfo = {
    name: "PhoneHub",
    phone: "0101 234 5678",
    address: "القاهرة - مصر",
    facebook: "facebook.com/phonehub.eg",
    logoText: "PH"
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-8 px-4">
      <div className="max-w-[800px] mx-auto">
        
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6 no-print">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
          >
            <ArrowLeft className="w-4 h-4" /> العودة
          </button>
          <button 
            onClick={handlePrint}
            className="pos-button pos-button-primary"
          >
            <Printer className="w-4 h-4" /> طباعة الفاتورة
          </button>
        </div>

        {/* Invoice Content */}
        <div className="bg-white shadow-xl rounded-3xl p-10 print:shadow-none print:rounded-none print:p-8" id="invoice">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center text-3xl font-bold">
                  {shopInfo.logoText}
                </div>
                <div>
                  <div className="font-bold text-4xl tracking-tighter">{shopInfo.name}</div>
                  <div className="text-sm text-zinc-500 mt-0.5">{shopInfo.address}</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono text-sm text-zinc-500">رقم الفاتورة</div>
              <div className="font-semibold text-2xl tracking-tight">{invoice.invoice_number}</div>
              <div className="text-xs text-emerald-600 mt-1">{invoice.type === 'sale' ? 'فاتورة بيع' : 'فاتورة شراء'}</div>
            </div>
          </div>

          {/* Shop Info + Contact */}
          <div className="flex justify-between mt-8 text-sm">
            <div>
              <div className="font-medium text-zinc-900">هاتف: {shopInfo.phone}</div>
              <div className="text-zinc-500">فيسبوك: {shopInfo.facebook}</div>
            </div>
            <div className="text-right text-sm">
              <div>التاريخ: {invoice.date}</div>
              <div>الكاشير: {invoice.created_by}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mt-8 bg-zinc-50 p-5 rounded-2xl">
            <div className="text-xs text-zinc-500 mb-1">العميل</div>
            <div className="font-medium">{invoice.customer_name}</div>
            <div className="font-mono text-sm text-zinc-600">{invoice.customer_phone}</div>
          </div>

          {/* Items Table */}
          <table className="w-full mt-8 text-sm">
            <thead>
              <tr className="border-b text-zinc-500 text-xs">
                <th className="py-3 text-right font-medium">الصنف</th>
                <th className="py-3 text-right font-medium">الباركود</th>
                <th className="py-3 text-center font-medium">الكمية</th>
                <th className="py-3 text-right font-medium">السعر</th>
                <th className="py-3 text-right font-medium">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 font-medium">{item.name}</td>
                  <td className="py-4 font-mono text-xs text-zinc-500">{item.barcode}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">{item.price.toLocaleString()} ج.م</td>
                  <td className="py-4 text-right font-semibold">{item.total.toLocaleString()} ج.م</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-80 space-y-2 text-sm">
              <div className="flex justify-between"><span>المجموع الفرعي</span> <span>{invoice.subtotal.toLocaleString()} ج.م</span></div>
              <div className="flex justify-between text-emerald-600"><span>الخصم</span> <span>-{invoice.discount} ج.م</span></div>
              <div className="flex justify-between pt-3 border-t font-semibold text-lg">
                <span>الإجمالي النهائي</span> 
                <span>{invoice.total.toLocaleString()} ج.م</span>
              </div>
              <div className="text-xs text-right text-zinc-500">طريقة الدفع: {invoice.payment_method}</div>
            </div>
          </div>

          {/* Watermark & Footer */}
          <div className="mt-12 pt-8 border-t relative">
            <div className="text-center">
              <div className="text-xs text-zinc-400">شكرًا لتعاملكم معنا</div>
              <div className="mt-2 text-[10px] text-zinc-400">© {shopInfo.name} 2026</div>
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none">
              <div className="text-[120px] font-black tracking-[-10px] rotate-[-12deg]">
                {shopInfo.name}
              </div>
            </div>

            {/* Facebook Barcode */}
            <div className="mt-8 flex justify-center">
              <div className="text-center">
                <div className="text-[10px] text-zinc-400 mb-1">صفحتنا على فيسبوك</div>
                <div className="font-mono text-xs border px-4 py-1 rounded inline-block">
                  {shopInfo.facebook}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-zinc-400 no-print">
          الفاتورة جاهزة للطباعة • يمكن استخدامها للبيع أو الشراء
        </div>
      </div>
    </div>
  );
}
