import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { 
      nome, 
      nome_responsavel, 
      email, 
      telefone, 
      empresa, 
      cidade, 
      estado, 
      experiencia_distribuicao,
      mensagem 
    } = data

    if (!email) return res.status(400).json({ error: 'email_required' })

    const payload = {
      nome: (nome || nome_responsavel || '').toString().trim() || null,
      nome_responsavel: (nome_responsavel || nome || '').toString().trim() || null,
      email: (email || '').toString().trim().toLowerCase(),
      telefone: (telefone || '').toString().trim() || null,
      empresa: (empresa || '').toString().trim() || null,
      cidade: (cidade || '').toString().trim() || null,
      estado: (estado || '').toString().trim() || null,
      experiencia_distribuicao: (experiencia_distribuicao || '').toString().trim() || null,
      mensagem: (mensagem || '').toString().trim() || null,
      origem: 'landing-nivela',
      created_at: new Date().toISOString()
    }

    const { error } = await supabaseAdmin.from('distribuidores').insert(payload)
    if (error) return res.status(400).json({ error: error.message })

    return res.status(201).json({ ok: true })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'insert_failed' })
  }
}
