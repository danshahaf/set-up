import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

if (!Constants.expoConfig?.extra?.supabaseUrl || !Constants.expoConfig?.extra?.supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anonymous Key');
}

export const supabase = createClient(
  Constants.expoConfig.extra.supabaseUrl,
  Constants.expoConfig.extra.supabaseAnonKey
);
