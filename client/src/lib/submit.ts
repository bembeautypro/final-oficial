import { supabase } from './supabaseClient'

export async function submitLead(payload: {
  nome: string
  email: string
  telefone: string
}) {
  const data = {
    nome: payload.nome?.trim(),
    email: payload.email?.trim().toLowerCase(),
    telefone: payload.telefone?.trim(),
  }
  
  const { error } = await supabase.from('leads_nivela').insert(data)
  if (error) return { ok: false as const, error: error.message }
  return { ok: true as const }
}

export async function submitDistribuidor(payload: {
  nome: string
  email: string
  telefone: string
  empresa?: string
  mensagem?: string
  cidade?: string
  estado?: string
}) {
  const data = {
    nome: payload.nome?.trim(),
    email: payload.email?.trim().toLowerCase(),
    telefone: payload.telefone?.trim(),
    empresa: payload.empresa?.trim() || null,
    mensagem: payload.mensagem?.trim() || null,
    cidade: payload.cidade?.trim() || null,
    estado: payload.estado?.trim() || null,
  }
  
  const { data: result, error } = await supabase.from('distribuidores').insert(data).select()
  
  if (error) {
    if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return { ok: false as const, error: 'Este email já está cadastrado como distribuidor' }
    }
    return { ok: false as const, error: error.message }
  }
  
  return { ok: true as const }
}