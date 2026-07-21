'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Database, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
}

export default function SettingsPage() {
  const [shopName, setShopName] = useState('PhoneHub');
  const [phone, setPhone] = useState('01012345678');
  const [facebook, setFacebook] = useState('facebook.com/phonehub.eg');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const auditLogs: AuditLog[] = [
    { id: '1', action: 'إضافة صنف جديد (آيفون 16)', user: 'أحمد محمد', role: 'مدير', timestamp: 'اليوم 14:22' },
    { id: '2', action: 'إصدار فاتورة بيع INV-0891', user: 'خالد علي', role: 'كاشير', timestamp: 'اليوم 13:45' },
    { id: '3', action: 'تعديل بيانات عميل', user: 'سارة أحمد', role: 'محاسب', timestamp: 'اليوم 11:10' },
    { id: '4', action: 'فتح وردية جديدة', user: 'أحمد محمد', role: 'مدير', timestamp: 'اليوم 09:15' },
  ];

  const handleSave = () => {
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  const sendTestNotification = () => {
    toast.info('إشعار تجريبي', {
      description: 'تم إرسال إشعار إلى جميع المستخدمين',
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">الإعدادات</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Shop Info */}
          <div className="lg:col-span-2 pos-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5" />
              <h3 className="font-semibold text-lg">بيانات المحل</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm mb-1.5 text-zinc-600">اسم المحل</label>
                <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} className="pos-input" />
              </div>
              <div>
                <label className="block text-sm mb-1.5 text-zinc-600">رقم الهاتف</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="pos-input" />
              </div>
              <div>
                <label className="block text-sm mb-1.5 text-zinc-600">صفحة الفيسبوك</label>
                <input type="text" value={facebook} onChange={e => setFacebook(e.target.value)} className="pos-input" />
              </div>
            </div>

            <button onClick={handleSave} className="mt-6 pos-button pos-button-primary w-full">حفظ التغييرات</button>
          </div>

          {/* Notifications & Roles */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="pos-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5" />
                <div className="font-semibold">الإشعارات</div>
              </div>
              <div className="flex items-center justify-between">
                <div>تفعيل الإشعارات</div>
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled} 
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                  className="w-5 h-5 accent-black" 
                />
              </div>
              <button onClick={sendTestNotification} className="mt-4 w-full pos-button pos-button-secondary text-sm">
                إرسال إشعار تجريبي
              </button>
            </div>

            {/* Roles Info */}
            <div className="pos-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5" />
                <div className="font-semibold">الصلاحيات</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>مدير النظام</span> <span className="role-admin px-2 py-0.5 rounded text-xs">كل الصلاحيات</span></div>
                <div className="flex justify-between"><span>كاشير</span> <span className="role-cashier px-2 py-0.5 rounded text-xs">بيع + ورديات</span></div>
                <div className="flex justify-between"><span>محاسب</span> <span className="role-accountant px-2 py-0.5 rounded text-xs">تقارير + فواتير</span></div>
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="lg:col-span-3 pos-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5" />
              <h3 className="font-semibold text-lg">سجل العمليات (من قام بالتعديل)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="table-header border-b">
                    <th className="p-3 text-right">العملية</th>
                    <th className="p-3 text-right">المستخدم</th>
                    <th className="p-3 text-right">الصلاحية</th>
                    <th className="p-3 text-right">الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id} className="border-b">
                      <td className="p-3 font-medium">{log.action}</td>
                      <td className="p-3">{log.user}</td>
                      <td className="p-3"><span className={`status-badge ${log.role === 'مدير' ? 'role-admin' : log.role === 'كاشير' ? 'role-cashier' : 'role-accountant'}`}>{log.role}</span></td>
                      <td className="p-3 text-zinc-500">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
