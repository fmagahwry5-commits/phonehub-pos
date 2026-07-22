'use client';

import React, { useState } from 'react';
import { Search, Trash2, Printer, User } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  serial?: string;
}

type InvoiceType = 'sale' | 'accessory' | 'repair' | 'installment';

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customer, setCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('نقدي');
  const [invoiceType, setInvoiceType] = useState<InvoiceType>('sale');

  // تفاصيل إضافية حسب النوع
  const [repairDetails, setRepairDetails] = useState({
    deviceModel: '',
    issue: '',
    estimatedDays: 3,
  });

  const [installmentDetails, setInstallmentDetails] = useState({
    totalAmount: 0,
    downPayment: 0,
    months: 6,
    monthlyAmount: 0,
  });

  const invoiceTypes = [
    { value: 'sale', label: 'بيع عادي', color: 'bg-emerald-600' },
    { value: 'accessory', label: 'إكسسوارات', color: 'bg-blue-600' },
    { value: 'repair', label: 'صيانة', color: 'bg-orange-600' },
    { value: 'installment', label: 'أقساط', color: 'bg-purple-600' },
  ];

  const addToCart = (product: any) => {
    const existing = cart.findIndex(item => item.barcode === product.barcode);
    if (existing !== -1) {
      const newCart = [...cart];
      newCart[existing].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`تمت إضافة ${product.name}`);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const typeLabel = invoiceTypes.find(t => t.value === invoiceType)?.label;

    toast.success(`تم إصدار فاتورة ${typeLabel}`, {
      description: `إجمالي: ${total} ج.م`,
    });

    setTimeout(() => window.print(), 300);

    setCart([]);
    setCustomer('');
    setRepairDetails({ deviceModel: '', issue: '', estimatedDays: 3 });
    setInstallmentDetails({ totalAmount: 0, downPayment: 0, months: 6, monthlyAmount: 0 });
  };

  const demoProducts = [
    { id: '1', name: 'آيفون 16 برو', barcode: '1234567890123', price: 45900 },
    { id: '2', name: 'سامسونج S25', barcode: '9876543210987', price: 38500 },
    { id: '3', name: 'شاحن أصلي 20W', barcode: '1122334455667', price: 850 },
    { id: '4', name: 'كفر حماية', barcode: '9988776655443', price: 350 },
  ];

  const filteredProducts = demoProducts.filter(p =>
    p.name.includes(searchTerm) || p.barcode.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold">نقطة البيع</h1>
            <p className="text-zinc-500">محل PhoneHub • كاشير: أحمد محمد</p>
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0} className="pos-button pos-button-primary">
            <Printer className="w-4 h-4" /> إنهاء البيع
          </button>
        </div>

        {/* أزرار أنواع الفواتير */}
        <div className="flex flex-wrap gap-3 mb-6">
          {invoiceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setInvoiceType(type.value as InvoiceType)}
              className={`px-6 py-2 rounded-xl text-white font-medium flex items-center gap-2 transition-all ${
                invoiceType === type.value ? type.color : 'bg-zinc-300 text-zinc-700'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* المنتجات */}
          <div className="lg:col-span-2">
            <div className="pos-card p-6 mb-4">
              <div className="relative mb-4">
                <Search className="absolute right-4 top-3.5 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو الباركود..."
                  className="pos-input pr-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredProducts.map(product => (
                  <div key={product.id} onClick={() => addToCart(product)} className="p-4 border border-zinc-200 rounded-2xl hover:border-zinc-400 cursor-pointer active:scale-[0.985]">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-zinc-500 font-mono mt-1">{product.barcode}</div>
                    <div className="mt-3 font-semibold text-xl">{product.price.toLocaleString()} <span className="text-sm">ج.م</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* السلة */}
          <div className="pos-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">سلة المشتريات</h3>
              <div className="text-sm px-3 py-1 bg-zinc-100 rounded-full">{cart.length} أصناف</div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1.5">
                <User className="w-4 h-4" /> العميل
              </div>
              <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="اسم العميل أو رقم الهاتف" className="pos-input" />
            </div>

            {/* تفاصيل حسب نوع الفاتورة */}
            {invoiceType === 'repair' && (
              <div className="mb-4 p-4 bg-orange-50 rounded-xl space-y-3">
                <div className="font-medium text-orange-700">تفاصيل الصيانة</div>
                <input type="text" placeholder="موديل الجهاز" className="pos-input" value={repairDetails.deviceModel} onChange={(e) => setRepairDetails({...repairDetails, deviceModel: e.target.value})} />
                <input type="text" placeholder="العطل" className="pos-input" value={repairDetails.issue} onChange={(e) => setRepairDetails({...repairDetails, issue: e.target.value})} />
                <input type="number" placeholder="عدد الأيام المتوقعة" className="pos-input" value={repairDetails.estimatedDays} onChange={(e) => setRepairDetails({...repairDetails, estimatedDays: Number(e.target.value)})} />
              </div>
            )}

            {invoiceType === 'installment' && (
              <div className="mb-4 p-4 bg-purple-50 rounded-xl space-y-3">
                <div className="font-medium text-purple-700">تفاصيل الأقساط</div>
                <input type="number" placeholder="إجمالي المبلغ" className="pos-input" value={installmentDetails.totalAmount} onChange={(e) => setInstallmentDetails({...installmentDetails, totalAmount: Number(e.target.value)})} />
                <input type="number" placeholder="المقدم" className="pos-input" value={installmentDetails.downPayment} onChange={(e) => setInstallmentDetails({...installmentDetails, downPayment: Number(e.target.value)})} />
                <input type="number" placeholder="عدد الأشهر" className="pos-input" value={installmentDetails.months} onChange={(e) => setInstallmentDetails({...installmentDetails, months: Number(e.target.value)})} />
              </div>
            )}

            <div className="flex-1 overflow-auto space-y-2 mb-4">
              {cart.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-zinc-400 text-sm">السلة فارغة</div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-zinc-500">{item.barcode}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{(item.price * item.quantity).toLocaleString()} ج.م</div>
                      <div className="text-xs text-zinc-500">×{item.quantity}</div>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-zinc-500">الإجمالي</span>
                <span className="text-4xl font-semibold tracking-tighter">{total.toLocaleString()}</span>
              </div>

              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="pos-input mb-3 text-sm">
                <option value="نقدي">نقدي</option>
                <option value="فيزا">فيزا</option>
                <option value="محفظة">محفظة إلكترونية</option>
              </select>

              <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full pos-button pos-button-primary text-lg py-4 disabled:opacity-50">
                إتمام البيع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}