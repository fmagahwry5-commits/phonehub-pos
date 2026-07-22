'use client';

import React, { useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function InstallmentsPage() {
  const [installments, setInstallments] = useState([
    { id: '1', customer: 'أحمد محمد', total: 45900, paid: 15000, remaining: 30900, months: 6, monthly: 5150, status: 'جاري' },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newInstallment, setNewInstallment] = useState({
    customer: '', total: 0, downPayment: 0, months: 6,
  });

  const addInstallment = () => {
    if (!newInstallment.customer || !newInstallment.total) {
      toast.error('أدخل بيانات صحيحة');
      return;
    }

    const remaining = newInstallment.total - newInstallment.downPayment;
    const monthly = Math.round(remaining / newInstallment.months);

    setInstallments([...installments, {
      id: Date.now().toString(),
      customer: newInstallment.customer,
      total: newInstallment.total,
      paid: newInstallment.downPayment,
      remaining,
      months: newInstallment.months,
      monthly,
      status: 'جاري',
    }]);

    setShowAdd(false);
    setNewInstallment({ customer: '', total: 0, downPayment: 0, months: 6 });
    toast.success('تم تسجيل عقد القسط');
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-3">
              <CreditCard className="w-8 h-8" /> إدارة الأقساط
            </h1>
            <p className="text-zinc-500">متابعة عقود الأقساط والدفعات</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="pos-button pos-button-primary">
            <Plus className="w-4 h-4" /> عقد قسط جديد
          </button>
        </div>

        <div className="pos-card">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="p-4 text-right">العميل</th>
                <th className="p-4 text-right">الإجمالي</th>
                <th className="p-4 text-right">المدفوع</th>
                <th className="p-4 text-right">المتبقي</th>
                <th className="p-4 text-center">عدد الأشهر</th>
                <th className="p-4 text-center">القسط الشهري</th>
                <th className="p-4 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {installments.map((i) => (
                <tr key={i.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4 font-medium">{i.customer}</td>
                  <td className="p-4">{i.total.toLocaleString()} ج.م</td>
                  <td className="p-4 text-emerald-600">{i.paid.toLocaleString()} ج.م</td>
                  <td className="p-4 font-semibold text-red-600">{i.remaining.toLocaleString()} ج.م</td>
                  <td className="p-4 text-center">{i.months}</td>
                  <td className="p-4 text-center font-semibold">{i.monthly.toLocaleString()} ج.م</td>
                  <td className="p-4 text-center">
                    <span className="status-badge bg-orange-100 text-orange-700">{i.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال إضافة قسط */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-6">عقد قسط جديد</h3>
            
            <div className="space-y-4">
              <input type="text" placeholder="اسم العميل" className="pos-input" value={newInstallment.customer} onChange={(e) => setNewInstallment({...newInstallment, customer: e.target.value})} />
              <input type="number" placeholder="إجمالي المبلغ" className="pos-input" value={newInstallment.total} onChange={(e) => setNewInstallment({...newInstallment, total: Number(e.target.value)})} />
              <input type="number" placeholder="المقدم" className="pos-input" value={newInstallment.downPayment} onChange={(e) => setNewInstallment({...newInstallment, downPayment: Number(e.target.value)})} />
              <input type="number" placeholder="عدد الأشهر" className="pos-input" value={newInstallment.months} onChange={(e) => setNewInstallment({...newInstallment, months: Number(e.target.value)})} />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="flex-1 pos-button pos-button-secondary">إلغاء</button>
              <button onClick={addInstallment} className="flex-1 pos-button pos-button-primary">تسجيل العقد</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}