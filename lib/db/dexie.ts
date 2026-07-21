import Dexie, { Table } from 'dexie';
import { Product, Customer, Invoice, Shift, SyncQueueItem } from '../types';

export class PhonePOSDatabase extends Dexie {
  products!: Table<Product>;
  customers!: Table<Customer>;
  invoices!: Table<Invoice>;
  shifts!: Table<Shift>;
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super('PhonePOSDB');
    
    this.version(1).stores({
      products: 'id, barcode, sku, name, category, updated_at',
      customers: 'id, phone, name',
      invoices: 'id, invoice_number, type, created_at, customer_id',
      shifts: 'id, user_id, status, start_time',
      syncQueue: 'id, table, action, timestamp, synced'
    });
  }
}

export const db = new PhonePOSDatabase();

// Helper functions
export async function addToSyncQueue(table: string, action: 'insert' | 'update' | 'delete', data: any) {
  await db.syncQueue.add({
    id: crypto.randomUUID(),
    table,
    action,
    data,
    timestamp: Date.now(),
    synced: false
  });
}

export async function getUnsyncedItems() {
  return await db.syncQueue.where('synced').equals(0).toArray();
}

export async function markAsSynced(id: string) {
  await db.syncQueue.update(id, { synced: true });
}
