import { supabase } from './supabaseClient'

export async function saveLead(input: { 
  nome: string
  email: string
  telefone: string
  tipo_estabelecimento?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
}) {
  const payload = { 
    nome: input.nome,
    email: input.email.toLowerCase().trim(),
    telefone: input.telefone,
    tipo_estabelecimento: input.tipo_estabelecimento,
    utm_source: input.utm_source,
    utm_medium: input.utm_medium,
    utm_campaign: input.utm_campaign,
    utm_content: input.utm_content,
    utm_term: input.utm_term
  }
  const { data, error } = await supabase
    .from('leads_nivela')
    .insert([payload])
    .select('id, created_at')
  
  if (error) throw error
  return data?.[0]
}

export async function saveDistribuidor(input: { 
  nome: string
  email: string
  telefone: string
  tipo_estabelecimento?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
  empresa?: string | null
  cidade?: string | null
  estado?: string | null
  mensagem?: string | null
}) {
  const payload = { 
    nome: input.nome,
    email: input.email.toLowerCase().trim(),
    telefone: input.telefone,
    tipo_estabelecimento: input.tipo_estabelecimento,
    utm_source: input.utm_source,
    utm_medium: input.utm_medium,
    utm_campaign: input.utm_campaign,
    utm_content: input.utm_content,
    utm_term: input.utm_term,
    empresa: input.empresa,
    cidade: input.cidade,
    estado: input.estado,
    mensagem: input.mensagem
  }
  const { data, error } = await supabase
    .from('distribuidores')
    .insert([payload])
    .select('id, created_at')
  
  if (error) throw error
  return data?.[0]
}