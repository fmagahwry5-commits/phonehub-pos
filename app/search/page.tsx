'use client';

import React, { useState } from 'react';
import { Search, Package, Users, Truck, FileText, Clock, History } from 'lucide-react';
import { SearchResult } from '@/lib/types';

export default function AdvancedSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'customer' | 'supplier' | 'invoice' | 'shift'>('all');

  // Demo data for search
  const allData: SearchResult[] = [
    // Products
    { type: 'product', id: 'p1', title: 'آيفون 16 برو', subtitle: '1234567890123', details: 'سعر: 45900 ج.م • مخزون: 12', data: {} },
    { type: 'product', id: 'p2', title: 'سامسونج S25', subtitle: '9876543210987', details: 'سعر: 38500 ج.م • مخزون: 7', data: {} },
    
    // Customers
    { type: 'customer', id: 'c1', title: 'أحمد محمد', subtitle: '01012345678', details: '12 فاتورة • إجمالي: 124,500 ج.م', data: {} },
    { type: 'customer', id: 'c2', title: 'سارة علي', subtitle: '01123456789', details: '7 فواتير • إجمالي: 68,500 ج.م', data: {} },
    
    // Suppliers
    { type: 'supplier', id: 's1', title: 'شركة أبل الشرق الأوسط', subtitle: '01098765432', details: 'إجمالي مشتريات: 124,500 ج.م', data: {} },
    
    // Invoices
    { type: 'invoice', id: 'i1', title: 'INV-2026-0891', subtitle: 'أحمد محمد', details: 'بيع • 46,000 ج.م • 21 يوليو', data: {} },
    { type: 'invoice', id: 'i2', title: 'INV-2026-0887', subtitle: 'شركة أبل', details: 'شراء • 89,000 ج.م • 18 يوليو', data: {} },
    
    // Shifts
    { type: 'shift', id: 'sh1', title: 'SHIFT-2026-071', subtitle: 'أحمد محمد', details: 'صافي: 11,050 ج.م • مغلقة', data: {} },
    
    // Audit
    { type: 'audit', id: 'a1', title: 'إضافة آيفون 16 برو', subtitle: 'أحمد محمد (مدير)', details: 'اليوم 14:22', data: {} },
  ];

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    
    let filtered = allData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.subtitle.toLowerCase().includes(lowerQuery) ||
      item.details.toLowerCase().includes(lowerQuery)
    );

    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === activeFilter);
    }

    setResults(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  const handleFilterChange = (filter: any) => {
    setActiveFilter(filter);
    performSearch(query);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'product': return <Package className="w-4 h-4" />;
      case 'customer': return <Users className="w-4 h-4" />;
      case 'supplier': return <Truck className="w-4 h-4" />;
      case 'invoice': return <FileText className="w-4 h-4" />;
      case 'shift': return <Clock className="w-4 h-4" />;
      case 'audit': return <History className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: any = {
      product: 'منتج', customer: 'عميل', supplier: 'مورد',
      invoice: 'فاتورة', shift: 'وردية', audit: 'عملية'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">البحث الشامل</h1>
          <p className="text-zinc-500 mt-1">ابحث في المنتجات، العملاء، الموردين، الفواتير، الورديات وسجل العمليات</p>
        </div>

        {/* Search Bar */}
        <div className="pos-card p-6 mb-6">
          <div className="relative">
            <Search className="absolute right-5 top-4 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="ابحث بأي كلمة (اسم منتج، عميل، مورد، رقم فاتورة، رقم وردية...)"
              className="pos-input pr-14 text-lg py-4"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'الكل' },
            { key: 'product', label: 'المنتجات' },
            { key: 'customer', label: 'العملاء' },
            { key: 'supplier', label: 'الموردين' },
            { key: 'invoice', label: 'الفواتير' },
            { key: 'shift', label: 'الورديات' },
            { key: 'audit', label: 'سجل العمليات' },
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activeFilter === filter.key 
                  ? 'bg-zinc-900 text-white' 
                  : 'bg-white border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="pos-card">
          {results.length > 0 ? (
            <div className="divide-y">
              {results.map((result, index) => (
                <div key={index} className="p-5 flex items-start gap-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="mt-1 p-2 bg-zinc-100 rounded-xl text-zinc-600">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-lg">{result.title}</div>
                      <div className="text-xs px-3 py-0.5 bg-zinc-100 text-zinc-600 rounded-full">
                        {getTypeLabel(result.type)}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500 mt-0.5">{result.subtitle}</div>
                    <div className="text-sm mt-1 text-zinc-600">{result.details}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="p-12 text-center text-zinc-400">
              لا توجد نتائج مطابقة لـ "{query}"
            </div>
          ) : (
            <div className="p-12 text-center text-zinc-400">
              ابدأ بالكتابة للبحث في كل بيانات النظام
            </div>
          )}
        </div>

        <div className="text-xs text-center text-zinc-400 mt-6">
          يشمل البحث: المنتجات • العملاء • الموردين • الفواتير • الورديات • سجل العمليات
        </div>
      </div>
    </div>
  );
}
