// import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dkwnjorztpimitpmqspp.supabase.co'; // Remplacez
const SUPABASE_ANON_KEY = 'sb_publishable_5ZUwfoxfTFwcGnsrBuvbsA_HKagegA9N'; // Remplacez

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});