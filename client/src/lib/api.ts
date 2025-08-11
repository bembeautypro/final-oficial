import { supabase } from './supabaseClient'

export async function saveLead(input: { 
  nome: string
  email: string
  telefone: string
}) {
  const payload = { 
    nome: input.nome,
    email: input.email.toLowerCase().trim(),
    telefone: input.telefone,
    hp: ''
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
  empresa?: string | null
  cidade?: string | null
  estado?: string | null
  mensagem?: string | null
}) {
  const payload = { 
    nome: input.nome,
    email: input.email.toLowerCase().trim(),
    telefone: input.telefone,
    empresa: input.empresa,
    cidade: input.cidade,
    estado: input.estado,
    mensagem: input.mensagem,
    hp: ''
  }
  const { data, error } = await supabase
    .from('distribuidores')
    .insert([payload])
    .select('id, created_at')
  
  if (error) throw error
  return data?.[0]
}