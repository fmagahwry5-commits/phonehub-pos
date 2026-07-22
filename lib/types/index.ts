export type UserRole = 'admin' | 'cashier' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  cost_price: number;
  stock: number;
  category: string;
  image_url?: string;
  serial_number?: string;
  battery_percentage?: number;
  condition?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  address?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  type: 'sale' | 'purchase' | 'return';
  customer_id?: string;
  customer_name?: string;
  total: number;
  discount: number;
  tax: number;
  net_total: number;
  payment_method: string;
  status: 'completed' | 'pending' | 'cancelled';
  created_by: string;
  created_by_name: string;
  created_at: string;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  product_id: string;
  product_name: string;
  barcode: string;
  serial_number?: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Shift {
  id: string;
  user_id: string;
  user_name: string;
  start_time: string;
  end_time?: string;
  opening_balance: number;
  closing_balance?: number;
  total_sales: number;
  total_purchases: number;
  total_accessories: number;
  total_repairs: number;
  net_amount: number;
  status: 'open' | 'closed';
  created_at: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  details?: string;
}

export interface SearchResult {
  type: 'product' | 'customer' | 'supplier' | 'invoice' | 'shift' | 'audit';
  id: string;
  title: string;
  subtitle: string;
  details: string;
  data: any;
}

export interface SyncQueueItem {
  id: string;
  table: string;
  action: 'insert' | 'update' | 'delete';
  data: any;
  timestamp: number;
  synced: boolean;
}