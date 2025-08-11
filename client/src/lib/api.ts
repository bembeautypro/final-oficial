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
  hp?: string
}) {
  const payload = { 
    ...input, 
    email: input.email.toLowerCase().trim(), 
    hp: input.hp ?? '' 
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
  hp?: string
  empresa?: string | null
  cidade?: string | null
  estado?: string | null
  mensagem?: string | null
}) {
  const payload = { 
    ...input, 
    email: input.email.toLowerCase().trim(), 
    hp: input.hp ?? '' 
  }
  const { data, error } = await supabase
    .from('distribuidores')
    .insert([payload])
    .select('id, created_at')
  
  if (error) throw error
  return data?.[0]
}