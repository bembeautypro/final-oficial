// SIMPLIFIED - 3 FIELDS ONLY (Nome, Email, WhatsApp)
import { supabase } from './supabaseClient'

export async function saveLead(input: { 
  nome: string
  email: string
  telefone: string
}) {
  const { data, error } = await supabase
    .from('leads_nivela')
    .insert([{
      nome: input.nome.trim(),
      email: input.email.toLowerCase().trim(),
      telefone: input.telefone.trim()
    }])
    .select('id')
  
  if (error) throw error
  return data?.[0]
}

export async function saveDistribuidor(input: { 
  nome: string
  email: string
  telefone: string
}) {
  const { data, error } = await supabase
    .from('distribuidores')
    .insert([{
      nome: input.nome.trim(),
      email: input.email.toLowerCase().trim(),
      telefone: input.telefone.trim()
    }])
    .select('id')
  
  if (error) throw error
  return data?.[0]
}