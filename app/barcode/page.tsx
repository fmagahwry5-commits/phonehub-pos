'use client';

import React, { useEffect, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { Printer } from 'lucide-react';

export default function BarcodePage() {
  const [product, setProduct] = useState({
    name: 'آيفون 16 برو',
    barcode: '1234567890123',
    battery: '92',
    condition: 'ممتازة',
    shop: 'PhoneHub',
    price: '45900'
  });

  useEffect(() => {
    // Generate barcode
    const canvas = document.getElementById('barcode') as HTMLCanvasElement;
    if (canvas) {
      JsBarcode(canvas, product.barcode, {
        format: "CODE128",
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 14,
        margin: 10
      });
    }
  }, [product.barcode]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="pos-card p-8 print:shadow-none print:border-none">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="font-bold text-2xl tracking-tight">{product.shop}</div>
            <div className="text-xs text-zinc-500">محل هواتف متخصص • 01012345678</div>
          </div>

          <div className="border border-zinc-200 rounded-2xl p-6 bg-white">
            <div className="text-center">
              <div className="font-semibold text-xl mb-1">{product.name}</div>
              <div className="text-sm text-zinc-500 mb-4">حالة: {product.condition} • بطارية {product.battery}%</div>
              
              <canvas id="barcode" className="mx-auto"></canvas>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-zinc-400">
            facebook.com/phonehub.eg
          </div>
        </div>

        <button 
          onClick={handlePrint}
          className="mt-6 w-full pos-button pos-button-primary no-print"
        >
          <Printer className="w-4 h-4" /> طباعة الباركود
        </button>
      </div>
    </div>
  );
}
