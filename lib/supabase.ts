import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'react-native-dotenv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 