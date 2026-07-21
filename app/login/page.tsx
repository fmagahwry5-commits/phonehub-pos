'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@phonehub.com');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState<'admin' | 'cashier' | 'accountant'>('admin');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login
    localStorage.setItem('user', JSON.stringify({
      id: 'u1',
      name: role === 'admin' ? 'أحمد محمد' : role === 'cashier' ? 'خالد علي' : 'سارة أحمد',
      email,
      role
    }));

    toast.success('تم تسجيل الدخول بنجاح', {
      description: `مرحبًا بك كـ ${role === 'admin' ? 'مدير النظام' : role === 'cashier' ? 'كاشير' : 'محاسب'}`
    });

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl mb-4">
            <span className="text-4xl font-bold text-zinc-950">PH</span>
          </div>
          <h1 className="text-white text-3xl font-semibold tracking-tight">PhoneHub POS</h1>
          <p className="text-zinc-400 mt-1">تسجيل الدخول إلى النظام</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-600">البريد الإلكتروني</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="pos-input" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-600">كلمة المرور</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="pos-input" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-600">نوع الحساب</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as any)} 
                className="pos-input"
              >
                <option value="admin">مدير النظام</option>
                <option value="cashier">كاشير</option>
                <option value="accountant">محاسب</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full pos-button pos-button-primary py-4 text-lg mt-2"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-400">
            Demo: استخدم أي كلمة مرور
          </div>
        </div>
      </div>
    </div>
  );
}
