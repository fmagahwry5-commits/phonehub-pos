-- ============================================
-- PhoneHub POS - Supabase Database Schema
-- ============================================
-- هذا الملف يحتوي على هيكل قاعدة البيانات الكامل لنظام نقاط البيع
-- يدعم: Offline Sync + Real-time + Row Level Security

-- ============================================
-- 1. USERS TABLE (المستخدمين)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'cashier', 'accountant')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PRODUCTS TABLE (المنتجات)
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sku TEXT,
  barcode TEXT UNIQUE NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  cost_price NUMERIC(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category TEXT,
  serial_number TEXT,
  battery_percentage INTEGER,
  condition TEXT,
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CUSTOMERS TABLE (العملاء)
-- ============================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. SUPPLIERS TABLE (الموردين)
-- ============================================
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. INVOICES TABLE (الفواتير)
-- ============================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'purchase', 'return')),
  customer_id UUID REFERENCES customers(id),
  customer_name TEXT,
  total NUMERIC(12,2) NOT NULL,
  discount NUMERIC(10,2) DEFAULT 0,
  tax NUMERIC(10,2) DEFAULT 0,
  net_total NUMERIC(12,2) NOT NULL,
  payment_method TEXT,
  status TEXT DEFAULT 'completed',
  created_by UUID REFERENCES users(id),
  created_by_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. INVOICE_ITEMS TABLE (تفاصيل الفواتير)
-- ============================================
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  barcode TEXT,
  serial_number TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL
);

-- ============================================
-- 7. SHIFTS TABLE (الورديات)
-- ============================================
CREATE TABLE shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  user_name TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  opening_balance NUMERIC(10,2) DEFAULT 0,
  closing_balance NUMERIC(10,2),
  total_sales NUMERIC(12,2) DEFAULT 0,
  total_purchases NUMERIC(12,2) DEFAULT 0,
  total_accessories NUMERIC(12,2) DEFAULT 0,
  total_repairs NUMERIC(12,2) DEFAULT 0,
  net_amount NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. AUDIT_LOGS TABLE (سجل العمليات)
-- ============================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  user_name TEXT,
  role TEXT,
  details JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. SUSPENDED_INVOICES TABLE (الفواتير المعلقة)
-- ============================================
CREATE TABLE suspended_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT,
  customer_name TEXT,
  items JSONB NOT NULL,
  total NUMERIC(12,2),
  suspended_by UUID REFERENCES users(id),
  suspended_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES (لتحسين الأداء)
-- ============================================
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_invoices_created_at ON invoices(created_at);
CREATE INDEX idx_shifts_status ON shifts(status);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- سياسات أمان بسيطة (يمكن تخصيصها لاحقًا)
CREATE POLICY "Allow all for authenticated users" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON invoices FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- REALTIME PUBLICATION (للمزامنة الفورية)
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE products, invoices, shifts, customers;
