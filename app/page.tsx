'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to dashboard (demo mode)
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center">
          <span className="text-3xl font-bold text-zinc-950">PH</span>
        </div>
        <h1 className="text-white text-3xl font-semibold tracking-tight">PhoneHub POS</h1>
        <p className="text-zinc-400 mt-2">جاري تحميل النظام...</p>
      </div>
    </div>
  );
}
