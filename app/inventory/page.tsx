'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  cost_price: number;
  stock: number;
  serial_number?: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '', barcode: '', price: 0, cost_price: 0, stock: 0, serial_number: '',
  });

  // جلب المنتجات
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      toast.error('فشل في الاتصال بقاعدة البيانات');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  // إضافة منتج
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.barcode) {
      toast.error('الاسم والباركود مطلوبين');
      return;
    }

    const { error } = await supabase.from('products').insert([{
      name: newProduct.name,
      barcode: newProduct.barcode,
      price: newProduct.price,
      cost_price: newProduct.cost_price,
      stock: newProduct.stock,
      serial_number: newProduct.serial_number || null,
    }]);

    if (error) {
      console.error('Insert Error:', error);
      toast.error('فشل في إضافة المنتج: ' + error.message);
    } else {
      toast.success('تم إضافة الصنف بنجاح');
      setShowAddModal(false);
      setNewProduct({ name: '', barcode: '', price: 0, cost_price: 0, stock: 0, serial_number: '' });
      fetchProducts();
    }
  };

  // Realtime
  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <div className="p-6">جاري التحميل من Supabase...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">إدارة المخزن</h1>
            <p className="text-sm text-emerald-600">متصل بـ Supabase • Realtime مفعل</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="pos-button pos-button-primary">
            <Plus className="w-4 h-4" /> إضافة صنف
          </button>
        </div>

        <div className="pos-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="table-header border-b">
                <th className="p-4 text-right">المنتج</th>
                <th className="p-4 text-right">الباركود</th>
                <th className="p-4 text-right">السعر</th>
                <th className="p-4 text-right">التكلفة</th>
                <th className="p-4 text-center">المخزون</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-400">
                    لا توجد منتجات بعد. أضف أول منتج.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-zinc-50">
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 font-mono text-sm">{product.barcode}</td>
                    <td className="p-4 font-semibold">{product.price.toLocaleString()} ج.م</td>
                    <td className="p-4 text-zinc-500">{product.cost_price?.toLocaleString()} ج.م</td>
                    <td className="p-4 text-center">
                      <span className="status-badge bg-emerald-100 text-emerald-700">{product.stock}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* مودال إضافة */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-6">إضافة صنف جديد</h3>
              <div className="space-y-4">
                <input type="text" placeholder="اسم الصنف" className="pos-input" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input type="text" placeholder="الباركود" className="pos-input" value={newProduct.barcode} onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="سعر البيع" className="pos-input" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                  <input type="number" placeholder="سعر التكلفة" className="pos-input" value={newProduct.cost_price} onChange={(e) => setNewProduct({ ...newProduct, cost_price: Number(e.target.value) })} />
                </div>
                <input type="number" placeholder="الكمية" className="pos-input" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddModal(false)} className="flex-1 pos-button pos-button-secondary">إلغاء</button>
                <button onClick={handleAddProduct} className="flex-1 pos-button pos-button-primary">إضافة</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}