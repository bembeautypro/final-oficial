import { supabase } from './supabaseClient'

export async function submitLead(payload: {
  nome: string
  email: string
  telefone: string
  tipo_estabelecimento?: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}) {
  const data = {
    nome: payload.nome?.trim(),
    email: payload.email?.trim().toLowerCase(),
    telefone: payload.telefone?.trim(),
    tipo_estabelecimento: payload.tipo_estabelecimento || null,
    utm_source: payload.utm_source || 'landing',
    utm_medium: payload.utm_medium || 'form',
    utm_campaign: payload.utm_campaign || 'nivela'
  }
  const { error } = await supabase.from('leads_nivela').insert(data)
  if (error) return { ok: false as const, error: error.message }
  return { ok: true as const }
}

export async function submitDistribuidor(payload: {
  nome: string
  email: string
  empresa?: string
  mensagem?: string
  cidade?: string
  estado?: string
  experiencia_distribuicao?: string
}) {
  const data = {
    nome: payload.nome?.trim(),
    email: payload.email?.trim().toLowerCase(),
    empresa: payload.empresa?.trim() || 'Não informado',
    mensagem: payload.mensagem?.trim() || null,
    cidade: payload.cidade?.trim() || null,
    estado: payload.estado?.trim() || null,
    experiencia_distribuicao: payload.experiencia_distribuicao || null
  }
  const { error } = await supabase.from('distribuidores').insert(data)
  if (error) {
    if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return { ok: false as const, error: 'Este email já está cadastrado como distribuidor' }
    }
    return { ok: false as const, error: error.message }
  }
  return { ok: true as const }
}