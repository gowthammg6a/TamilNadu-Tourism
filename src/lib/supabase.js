import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ywumpwinwoqpxjvlcxoa.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_kf4BcUzgFZmkGyYanrXhUg_Upa2NL72'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
