'use client';

import React, { useState } from 'react';
import { Upload, Plus, Printer, Edit2, Save, X, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  cost: number;
  stock: number;
  serial?: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'آيفون 16 برو', barcode: '1234567890123', price: 45900, cost: 38000, stock: 12, serial: 'F9K2L9P' },
    { id: '2', name: 'سامسونج S25', barcode: '9876543210987', price: 38500, cost: 31000, stock: 7, serial: 'S25-88421' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [previewData, setPreviewData] = useState<Product[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [editingProducts, setEditingProducts] = useState<Product[]>([]);

  const [newProduct, setNewProduct] = useState({
    name: '', barcode: '', price: 0, cost: 0, stock: 0, serial: '',
  });

  // ==================== إضافة صنف يدوي ====================
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.barcode) {
      toast.error('الاسم والباركود مطلوبين');
      return;
    }
    const product: Product = { id: Date.now().toString(), ...newProduct };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', barcode: '', price: 0, cost: 0, stock: 0, serial: '' });
    toast.success('تم إضافة الصنف بنجاح');
  };

  // ==================== استيراد من إكسيل + معاينة محسنة ====================
  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const mapped: Product[] = json.map((row: any, index: number) => ({
        id: (Date.now() + index).toString(),
        name: String(row['الاسم'] || row['Name'] || row['اسم الصنف'] || 'منتج بدون اسم'),
        barcode: String(row['الباركود'] || row['Barcode'] || Date.now()),
        price: parseFloat(row['السعر'] || row['Price'] || row['سعر البيع']) || 0,
        cost: parseFloat(row['تكلفة'] || row['Cost'] || row['سعر الشراء']) || 0,
        stock: parseInt(row['الكمية'] || row['Stock'] || row['الرصيد']) || 0,
        serial: String(row['السيريال'] || row['Serial'] || ''),
      }));

      setPreviewData(mapped);
      setShowPreview(true);
      toast.info(`تم قراءة ${mapped.length} صنف. قم بالمعاينة والتعديل قبل الاستيراد`);
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  // استيراد البيانات بعد المعاينة
  const importPreviewedData = () => {
    setProducts([...products, ...previewData]);
    setShowPreview(false);
    setPreviewData([]);
    toast.success(`تم استيراد ${previewData.length} صنف بنجاح`);
  };

  // تعديل داخل المعاينة
  const updatePreviewProduct = (index: number, field: keyof Product, value: any) => {
    const updated = [...previewData];
    updated[index] = { ...updated[index], [field]: value };
    setPreviewData(updated);
  };

  // ==================== التعديل الجماعي ====================
  const startBulkEdit = () => setEditingProducts([...products]);
  const saveBulkEdit = () => {
    setProducts(editingProducts);
    setEditingProducts([]);
    toast.success('تم حفظ التعديلات');
  };
  const cancelBulkEdit = () => setEditingProducts([]);

  const updateBulkProduct = (index: number, field: keyof Product, value: any) => {
    const updated = [...editingProducts];
    updated[index] = { ...updated[index], [field]: value };
    setEditingProducts(updated);
  };

  // ==================== طباعة باركود ====================
  const generateBarcode = (product: Product) => {
    window.open(`/barcode?product=${product.id}`, '_blank');
  };

  // ==================== تحميل نموذج Excel ====================
  const downloadTemplate = () => {
    const templateData = [
      {
        'الاسم': 'آيفون 16 برو',
        'الباركود': '1234567890123',
        'السعر': 45900,
        'تكلفة': 38000,
        'الكمية': 12,
        'السيريال': 'F9K2L9P'
      },
      {
        'الاسم': 'سامسونج S25',
        'الباركود': '9876543210987',
        'السعر': 38500,
        'تكلفة': 31000,
        'الكمية': 7,
        'السيريال': 'S25-88421'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "المنتجات");
    XLSX.writeFile(wb, "نموذج_استيراد_المنتجات.xlsx");
    
    toast.success('تم تحميل نموذج الاستيراد');
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">إدارة المخزن</h1>
            <p className="text-zinc-500">الأصناف والباركود والاستيراد</p>
          </div>
          <div className="flex gap-3">
            <button onClick={downloadTemplate} className="pos-button pos-button-secondary">
              <Download className="w-4 h-4" /> تحميل نموذج Excel
            </button>
            <label className="pos-button pos-button-secondary cursor-pointer">
              <Upload className="w-4 h-4" /> استيراد من إكسيل
              <input type="file" accept=".xlsx,.xls" onChange={handleExcelImport} className="hidden" />
            </label>
            <button onClick={() => setShowAddModal(true)} className="pos-button pos-button-primary">
              <Plus className="w-4 h-4" /> إضافة صنف
            </button>
            <button onClick={startBulkEdit} className="pos-button pos-button-secondary">
              <Edit2 className="w-4 h-4" /> تعديل جماعي
            </button>
          </div>
        </div>

        {/* جدول المنتجات */}
        <div className="pos-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="table-header border-b">
                <th className="p-4 text-right">المنتج</th>
                <th className="p-4 text-right">الباركود</th>
                <th className="p-4 text-right">السعر</th>
                <th className="p-4 text-right">التكلفة</th>
                <th className="p-4 text-center">المخزون</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {(editingProducts.length > 0 ? editingProducts : products).map((product, index) => (
                <tr key={index} className="border-b hover:bg-zinc-50">
                  <td className="p-4">
                    {editingProducts.length > 0 ? (
                      <input className="pos-input text-sm" value={product.name} onChange={(e) => updateBulkProduct(index, 'name', e.target.value)} />
                    ) : product.name}
                  </td>
                  <td className="p-4 font-mono text-sm">{product.barcode}</td>
                  <td className="p-4">{editingProducts.length > 0 ? <input type="number" className="pos-input text-sm" value={product.price} onChange={(e) => updateBulkProduct(index, 'price', Number(e.target.value))} /> : `${product.price.toLocaleString()} ج.م`}</td>
                  <td className="p-4 text-zinc-500">{editingProducts.length > 0 ? <input type="number" className="pos-input text-sm" value={product.cost} onChange={(e) => updateBulkProduct(index, 'cost', Number(e.target.value))} /> : `${product.cost.toLocaleString()} ج.م`}</td>
                  <td className="p-4 text-center">{editingProducts.length > 0 ? <input type="number" className="pos-input text-sm w-20" value={product.stock} onChange={(e) => updateBulkProduct(index, 'stock', Number(e.target.value))} /> : <span className="status-badge bg-emerald-100 text-emerald-700">{product.stock}</span>}</td>
                  <td className="p-4"><button onClick={() => generateBarcode(product)} className="p-2 hover:bg-zinc-100 rounded-lg"><Printer className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingProducts.length > 0 && (
          <div className="flex gap-3 mt-4 justify-end">
            <button onClick={cancelBulkEdit} className="pos-button pos-button-secondary"><X className="w-4 h-4" /> إلغاء</button>
            <button onClick={saveBulkEdit} className="pos-button pos-button-primary"><Save className="w-4 h-4" /> حفظ التعديلات</button>
          </div>
        )}

        {/* مودال إضافة صنف */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-6">إضافة صنف جديد</h3>
              <div className="space-y-4">
                <input type="text" placeholder="اسم الصنف" className="pos-input" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                <input type="text" placeholder="الباركود" className="pos-input" value={newProduct.barcode} onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="سعر البيع" className="pos-input" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  <input type="number" placeholder="سعر التكلفة" className="pos-input" value={newProduct.cost} onChange={(e) => setNewProduct({...newProduct, cost: Number(e.target.value)})} />
                </div>
                <input type="number" placeholder="الكمية" className="pos-input" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddModal(false)} className="flex-1 pos-button pos-button-secondary">إلغاء</button>
                <button onClick={handleAddProduct} className="flex-1 pos-button pos-button-primary">إضافة</button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== معاينة محسنة ==================== */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-7xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">معاينة البيانات قبل الاستيراد ({previewData.length} صنف)</h3>
                <button onClick={() => { setShowPreview(false); setPreviewData([]); }} className="pos-button pos-button-secondary">إغلاق</button>
              </div>

              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="bg-zinc-100">
                    <th className="p-3 text-right">الاسم</th>
                    <th className="p-3 text-right">الباركود</th>
                    <th className="p-3 text-right">السعر</th>
                    <th className="p-3 text-right">التكلفة</th>
                    <th className="p-3 text-center">المخزون</th>
                    <th className="p-3 text-right">السيريال</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((p, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-3"><input className="pos-input text-sm" value={p.name} onChange={(e) => updatePreviewProduct(i, 'name', e.target.value)} /></td>
                      <td className="p-3"><input className="pos-input text-sm font-mono" value={p.barcode} onChange={(e) => updatePreviewProduct(i, 'barcode', e.target.value)} /></td>
                      <td className="p-3"><input type="number" className="pos-input text-sm" value={p.price} onChange={(e) => updatePreviewProduct(i, 'price', Number(e.target.value))} /></td>
                      <td className="p-3"><input type="number" className="pos-input text-sm" value={p.cost} onChange={(e) => updatePreviewProduct(i, 'cost', Number(e.target.value))} /></td>
                      <td className="p-3"><input type="number" className="pos-input text-sm w-20" value={p.stock} onChange={(e) => updatePreviewProduct(i, 'stock', Number(e.target.value))} /></td>
                      <td className="p-3"><input className="pos-input text-sm" value={p.serial} onChange={(e) => updatePreviewProduct(i, 'serial', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex gap-3">
                <button onClick={() => { setShowPreview(false); setPreviewData([]); }} className="pos-button pos-button-secondary">إلغاء</button>
                <button onClick={importPreviewedData} className="pos-button pos-button-primary">استيراد {previewData.length} صنف</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}