import { saveLead, saveDistribuidor } from './api'

export async function submitLead(payload: {
  nome: string
  email: string
  telefone: string
}) {
  try {
    const result = await saveLead({
      nome: payload.nome?.trim(),
      email: payload.email?.trim().toLowerCase(),
      telefone: payload.telefone?.trim()
    })
    return { ok: true as const, data: result }
  } catch (error: any) {
    return { ok: false as const, error: error.message }
  }
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
  try {
    const result = await saveDistribuidor({
      nome: payload.nome?.trim(),
      email: payload.email?.trim().toLowerCase(),
      telefone: payload.telefone?.trim(),
      empresa: payload.empresa?.trim() || null,
      mensagem: payload.mensagem?.trim() || null,
      cidade: payload.cidade?.trim() || null,
      estado: payload.estado?.trim() || null
    })
    return { ok: true as const, distribuidor: result }
  } catch (error: any) {
    if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return { ok: false as const, error: 'Este email já está cadastrado como distribuidor' }
    }
    return { ok: false as const, error: error.message }
  }
}