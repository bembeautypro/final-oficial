import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { nome, email, telefone, tipoEstabelecimento, tipo_estabelecimento, origem } = data

    if (!email) return res.status(400).json({ error: 'email_required' })

    const payload = {
      nome: (nome || '').toString().trim() || null,
      email: (email || '').toString().trim().toLowerCase(),
      telefone: (telefone || '').toString().trim() || null,
      tipo_estabelecimento: tipoEstabelecimento || tipo_estabelecimento || null,
      origem: (origem || 'landing-nivela').toString().trim(),
      user_agent: req.headers['user-agent'] || '',
      ip_address: req.headers['x-forwarded-for']?.toString() || req.headers['x-real-ip']?.toString() || '',
      created_at: new Date().toISOString()
    }

    const { error } = await supabaseAdmin.from('leads_nivela').insert(payload)
    if (error) return res.status(400).json({ error: error.message })

    return res.status(201).json({ ok: true })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'insert_failed' })
  }
}
