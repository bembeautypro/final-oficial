// SIMPLIFIED - 3 FIELDS ONLY via Express API
export async function saveLead(input: { 
  nome: string
  email: string
  telefone: string
}) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: input.nome.trim(),
      email: input.email.toLowerCase().trim(),
      telefone: input.telefone.trim()
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao salvar lead')
  }

  const result = await response.json()
  return result.lead
}

export async function saveDistribuidor(input: { 
  nome: string
  email: string
  telefone: string
}) {
  const response = await fetch('/api/distribuidores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: input.nome.trim(),
      email: input.email.toLowerCase().trim(),
      telefone: input.telefone.trim()
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao salvar distribuidor')
  }

  const result = await response.json()
  return result.distribuidor
}