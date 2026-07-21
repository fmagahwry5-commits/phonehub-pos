# 📱 Phone Store POS - نظام نقاط بيع احترافي لمحلات الهواتف

نظام نقاط بيع (POS) احترافي **Offline-First** مع مزامنة فورية، مصمم خصيصًا لمحلات الهواتف.

## ✨ المميزات الرئيسية

- **Offline First** + Real-time Sync
- نظام صلاحيات (مدير - كاشير - محاسب)
- دعم كامل للباركود (توليد + طباعة + فحص)
- استخراج السيريال نمبر من الصور باستخدام OCR
- استيراد الأصناف من Excel
- طباعة فواتير احترافية + باركود
- إدارة الورديات + الخزنة
- نظام عملاء متقدم مع سجل الفواتير

## 🛠️ التقنيات المستخدمة

- **Next.js 16** + TypeScript
- **Supabase** (Database + Realtime + Auth) - مجاني
- **Dexie.js** (Offline Storage)
- **Tailwind CSS** + shadcn/ui style
- **Tesseract.js** (OCR)

## 🚀 التشغيل السريع

```bash
npm install
npm run dev
```

## 📁 هيكل المشروع

```
app/
├── (auth)/
├── dashboard/
├── pos/
├── inventory/
├── customers/
├── reports/
├── settings/
components/
lib/
  ├── db/
  ├── sync/
  └── utils/
```

## 🔑 ملاحظات هامة

- يستخدم Supabase المجاني (كافي جدًا للمحلات الصغيرة والمتوسطة)
- يعمل بدون إنترنت تمامًا
- يتزامن تلقائيًا عند عودة الاتصال

---

**تم تطويره بواسطة Arena.ai Agent** - 2026