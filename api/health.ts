import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const leads = await supabaseAdmin.from('leads_nivela').select('id', { head: true, count: 'exact' })
    const dist = await supabaseAdmin.from('distribuidores').select('id', { head: true, count: 'exact' })

    return res.status(200).json({
      ok: true,
      env: {
        SUPABASE_URL: !!process.env.SUPABASE_URL || !!process.env.VITE_SUPABASE_URL,
        SUPABASE_SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.SUPABASE_SERVICE_ROLE
      },
      db: {
        leads_count_available: leads.count ?? null,
        distribuidores_count_available: dist.count ?? null,
        leads_error: leads.error?.message ?? null,
        distribuidores_error: dist.error?.message ?? null
      },
      now: new Date().toISOString()
    })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'health failed' })
  }
}