import { supabase } from './supabaseClient'
import { readUTM } from './utm'

export async function submitLead(payload: {
  nome: string
  email: string
  telefone: string
  tipoEstabelecimento?: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
}) {
  const utm = readUTM()
  
  const data = {
    nome: payload.nome?.trim(),
    email: payload.email?.trim().toLowerCase(),
    telefone: payload.telefone?.trim(),
    tipoEstabelecimento: payload.tipoEstabelecimento || null,
    utmSource: payload.utm_source ?? utm.utm_source ?? null,
    utmMedium: payload.utm_medium ?? utm.utm_medium ?? null,
    utmCampaign: payload.utm_campaign ?? utm.utm_campaign ?? null
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
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
}) {
  const utm = readUTM()
  
  // Preparar dados - campos opcionais podem ser strings vazias
  const data = {
    nome: payload.nome?.trim(),
    email: payload.email?.trim().toLowerCase(),
    telefone: payload.telefone?.trim(),
    empresa: payload.empresa?.trim() || '',
    mensagem: payload.mensagem?.trim() || '',
    cidade: payload.cidade?.trim() || '',
    estado: payload.estado?.trim() || '',
    utm_source: payload.utm_source ?? utm.utm_source ?? null,
    utm_medium: payload.utm_medium ?? utm.utm_medium ?? null,
    utm_campaign: payload.utm_campaign ?? utm.utm_campaign ?? null,
    utm_content: payload.utm_content ?? utm.utm_content ?? null,
    utm_term: payload.utm_term ?? utm.utm_term ?? null
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