import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

function json(res: VercelResponse, code: number, body: any) {
  res.status(code).setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(body))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS básico
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method Not Allowed' })
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL
  const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return json(res, 500, { error: 'Variáveis SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY ausentes' })
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE)

  try {
    const { nome, email, telefone } = req.body ?? {}
    if (!nome || !email || !telefone) {
      return json(res, 400, { error: 'Campos obrigatórios: nome, email, telefone' })
    }

    const payload = {
      nome: String(nome).trim(),
      email: String(email).trim().toLowerCase(),
      telefone: String(telefone).trim()
    }

    const { data, error } = await supabase
      .from('leads_nivela')
      .insert(payload)
      .select()
      .single()

    if (error) return json(res, 400, { error: error.message })

    return json(res, 200, { success: true, lead: data })
  } catch (e: any) {
    return json(res, 500, { error: e?.message || 'Erro interno' })
  }
}