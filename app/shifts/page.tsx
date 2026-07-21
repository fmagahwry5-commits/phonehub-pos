'use client';

import React, { useState } from 'react';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function ShiftsPage() {
  const [shiftOpen, setShiftOpen] = useState(false);
  const [openingBalance, setOpeningBalance] = useState(5000);

  const [currentShift] = useState({
    id: 'SHIFT-2026-071',
    start: '2026-07-21 09:15',
    sales: 12450,
    purchases: 3200,
    accessories: 1850,
    repairs: 950,
    net: 12450 - 3200 + 1850 + 950
  });

  const handleOpenShift = () => {
    setShiftOpen(true);
    toast.success('تم فتح الوردية بنجاح');
  };

  const handleCloseShift = () => {
    toast.success('تم إغلاق الوردية وتصفير الخزنة', {
      description: `صافي الوردية: ${currentShift.net} ج.م`
    });
    setShiftOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">إدارة الورديات والخزنة</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Shift */}
          <div className="pos-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-zinc-500">الوردية الحالية</div>
                <div className="font-mono text-xl font-semibold">{currentShift.id}</div>
              </div>
              <Clock className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span>وقت البدء</span> <span>{currentShift.start}</span></div>
              <div className="flex justify-between"><span>مبيعات</span> <span className="font-medium">{currentShift.sales} ج.م</span></div>
              <div className="flex justify-between"><span>مشتريات</span> <span className="font-medium text-red-600">-{currentShift.purchases} ج.م</span></div>
              <div className="flex justify-between"><span>إكسسوارات</span> <span>{currentShift.accessories} ج.م</span></div>
              <div className="flex justify-between"><span>صيانات</span> <span>{currentShift.repairs} ج.م</span></div>
            </div>

            <div className="my-6 border-t pt-6 flex justify-between items-center">
              <div className="font-medium">صافي الوردية</div>
              <div className="text-4xl font-semibold tracking-tighter">{currentShift.net} <span className="text-sm">ج.م</span></div>
            </div>

            {!shiftOpen ? (
              <button onClick={handleOpenShift} className="w-full pos-button pos-button-primary">فتح وردية جديدة</button>
            ) : (
              <button onClick={handleCloseShift} className="w-full pos-button bg-red-600 text-white">إغلاق الوردية وتصفير الخزنة</button>
            )}
          </div>

          {/* Cash Register Summary */}
          <div className="pos-card p-8">
            <h3 className="font-semibold mb-4">ملخص الخزنة</h3>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3"><DollarSign className="text-emerald-600" /> رصيد الافتتاح</div>
                <div className="font-semibold">{openingBalance} ج.م</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3"><TrendingUp className="text-blue-600" /> صافي الحركة</div>
                <div className="font-semibold text-emerald-600">+{currentShift.net} ج.م</div>
              </div>
              <div className="pt-4 border-t flex justify-between text-lg font-semibold">
                <div>الرصيد المتوقع</div>
                <div>{openingBalance + currentShift.net} ج.م</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
