import { createClient } from '@supabase/supabase-js';

export const supabase = (() => {
  if (typeof window === 'undefined') {
    // أثناء البناء (Build Time) - نرجع كائن فارغ
    return {} as any;
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing');
    return {} as any;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
})();