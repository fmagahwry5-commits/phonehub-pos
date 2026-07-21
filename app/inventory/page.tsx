'use client';

import React, { useState } from 'react';
import { Upload, Plus, Printer, Scan } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

export default function InventoryPage() {
  const [products, setProducts] = useState([
    { id: '1', name: 'آيفون 16 برو', barcode: '1234567890123', price: 45900, cost: 38000, stock: 12, serial: 'F9K2L9P' },
    { id: '2', name: 'سامسونج S25', barcode: '9876543210987', price: 38500, cost: 31000, stock: 7, serial: 'S25-88421' },
  ]);

  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const newProducts = json.map((row: any, index: number) => ({
        id: Date.now() + index + '',
        name: row['الاسم'] || row['Name'],
        barcode: row['الباركود'] || row['Barcode'],
        price: parseFloat(row['السعر'] || row['Price']) || 0,
        cost: parseFloat(row['تكلفة'] || row['Cost']) || 0,
        stock: parseInt(row['الكمية'] || row['Stock']) || 0,
        serial: row['السيريال'] || '',
      }));

      setProducts([...products, ...newProducts]);
      toast.success(`تم استيراد ${newProducts.length} صنف بنجاح`);
    };
    reader.readAsBinaryString(file);
  };

  const generateBarcode = (product: any) => {
    toast.info(`توليد باركود لـ ${product.name}`, {
      description: "سيتم فتح نافذة الطباعة",
    });
    // In real app: open barcode print modal
    window.open(`/barcode?product=${product.id}`, '_blank');
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
            <label className="pos-button pos-button-secondary cursor-pointer">
              <Upload className="w-4 h-4" /> استيراد من إكسيل
              <input type="file" accept=".xlsx,.xls" onChange={handleExcelImport} className="hidden" />
            </label>
            <button className="pos-button pos-button-primary">
              <Plus className="w-4 h-4" /> إضافة صنف جديد
            </button>
          </div>
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
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b hover:bg-zinc-50">
                  <td className="p-4">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-zinc-500">{product.serial}</div>
                  </td>
                  <td className="p-4 font-mono text-sm">{product.barcode}</td>
                  <td className="p-4 font-semibold">{product.price.toLocaleString()} ج.م</td>
                  <td className="p-4 text-zinc-500">{product.cost.toLocaleString()} ج.م</td>
                  <td className="p-4 text-center">
                    <span className="status-badge bg-emerald-100 text-emerald-700">{product.stock}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => generateBarcode(product)} className="p-2 hover:bg-zinc-100 rounded-lg">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-zinc-100 rounded-lg">
                        <Scan className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
