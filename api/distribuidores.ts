import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })
  try {
    const { nome, email, telefone, empresa, cidade, estado } = (req.body || {}) as any
    if (!nome || !email || !empresa) return res.status(400).json({ error: 'Campos obrigatórios: nome, email, empresa' })

    const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
    const { error } = await supabase.from('distribuidores').insert({
      nome: String(nome).trim(),
      email: String(email).toLowerCase(),
      telefone: String(telefone || ''),
      empresa: String(empresa).trim(),
      cidade: String(cidade || ''),
      estado: String(estado || '')
    })

    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json({ ok: true })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Erro interno' })
  }
}
