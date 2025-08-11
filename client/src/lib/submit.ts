// SIMPLIFIED - 3 FIELDS ONLY
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
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function submitDistribuidor(payload: {
  nome: string
  email: string
  telefone: string
}) {
  try {
    const result = await saveDistribuidor({
      nome: payload.nome?.trim(),
      email: payload.email?.trim().toLowerCase(),
      telefone: payload.telefone?.trim()
    })
    return { ok: true as const, distribuidor: result }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as any)?.code;
    if (errorCode === '23505' || errorMessage?.includes('duplicate') || errorMessage?.includes('unique')) {
      return { ok: false as const, error: 'Este email já está cadastrado' }
    }
    return { ok: false as const, error: errorMessage }
  }
}