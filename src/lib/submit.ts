import { supabase } from './supabaseClient'

export async function submitLead(input: { nome:string; email:string; telefone:string }) {
  const payload = {
    nome: input.nome.trim(),
    email: input.email.trim().toLowerCase(),
    telefone: input.telefone.trim(),
  }
  const { error } = await supabase.from('leads_nivela').insert(payload)
  if (error) return { ok:false as const, error: error.message }
  return { ok:true as const }
}

export async function submitDistribuidor(input: { nome:string; email:string; telefone:string }) {
  const payload = {
    nome: input.nome.trim(),
    email: input.email.trim().toLowerCase(),
    telefone: input.telefone.trim(),
  }
  const { error } = await supabase.from('distribuidores').insert(payload)
  if (error) return { ok:false as const, error: error.message }
  return { ok:true as const }
}
