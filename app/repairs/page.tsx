'use client';

import React, { useState } from 'react';
import { Wrench, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Repair {
  id: string;
  customer: string;
  device: string;
  issue: string;
  status: string;
  date: string;
  estimated: string;
}

export default function RepairsPage() {
  const [repairs, setRepairs] = useState<Repair[]>([
    { 
      id: '1', 
      customer: 'أحمد محمد', 
      device: 'آيفون 16', 
      issue: 'شاشة مكسورة', 
      status: 'جاري', 
      date: '2026-07-20', 
      estimated: '3 أيام' 
    },
    { 
      id: '2', 
      customer: 'سارة علي', 
      device: 'سامسونج S24', 
      issue: 'بطارية', 
      status: 'مكتمل', 
      date: '2026-07-18', 
      estimated: '2 أيام' 
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newRepair, setNewRepair] = useState({
    customer: '',
    device: '',
    issue: '',
    estimated: '3',
  });

  const addRepair = () => {
    if (!newRepair.customer || !newRepair.device) {
      toast.error('العميل والجهاز مطلوبان');
      return;
    }

    const repair: Repair = {
      id: Date.now().toString(),
      customer: newRepair.customer,
      device: newRepair.device,
      issue: newRepair.issue,
      status: 'جاري',
      date: new Date().toISOString().split('T')[0],
      estimated: `${newRepair.estimated} أيام`,
    };

    setRepairs([...repairs, repair]);
    setShowAdd(false);
    setNewRepair({ customer: '', device: '', issue: '', estimated: '3' });
    toast.success('تم تسجيل طلب الصيانة بنجاح');
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-3">
              <Wrench className="w-8 h-8" /> إدارة الصيانة
            </h1>
            <p className="text-zinc-500">تسجيل ومتابعة أعمال الصيانة</p>
          </div>
          <button 
            onClick={() => setShowAdd(true)} 
            className="pos-button pos-button-primary"
          >
            <Plus className="w-4 h-4" /> تسجيل صيانة جديدة
          </button>
        </div>

        <div className="pos-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="table-header border-b">
                <th className="p-4 text-right">العميل</th>
                <th className="p-4 text-right">الجهاز</th>
                <th className="p-4 text-right">العطل</th>
                <th className="p-4 text-center">الحالة</th>
                <th className="p-4 text-center">التاريخ</th>
                <th className="p-4 text-center">المدة المتوقعة</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair) => (
                <tr key={repair.id} className="border-b hover:bg-zinc-50">
                  <td className="p-4 font-medium">{repair.customer}</td>
                  <td className="p-4">{repair.device}</td>
                  <td className="p-4 text-sm text-zinc-600">{repair.issue}</td>
                  <td className="p-4 text-center">
                    <span className={`status-badge ${repair.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                      {repair.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm">{repair.date}</td>
                  <td className="p-4 text-center text-sm">{repair.estimated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال إضافة صيانة */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-6">تسجيل صيانة جديدة</h3>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="اسم العميل" 
                className="pos-input"
                value={newRepair.customer}
                onChange={(e) => setNewRepair({...newRepair, customer: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="موديل الجهاز" 
                className="pos-input"
                value={newRepair.device}
                onChange={(e) => setNewRepair({...newRepair, device: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="وصف العطل" 
                className="pos-input"
                value={newRepair.issue}
                onChange={(e) => setNewRepair({...newRepair, issue: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="عدد الأيام المتوقعة" 
                className="pos-input"
                value={newRepair.estimated}
                onChange={(e) => setNewRepair({...newRepair, estimated: e.target.value})}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAdd(false)} 
                className="flex-1 pos-button pos-button-secondary"
              >
                إلغاء
              </button>
              <button 
                onClick={addRepair} 
                className="flex-1 pos-button pos-button-primary"
              >
                تسجيل الصيانة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}