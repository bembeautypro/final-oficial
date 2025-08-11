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

  const isJson = response.headers.get('content-type')?.includes('application/json')
  if (!response.ok) {
    let msg = response.statusText
    if (isJson) {
      try {
        const error = await response.json()
        msg = error?.error || msg
      } catch {}
    }
    throw new Error(msg || 'Erro ao salvar lead')
  }

  const result = isJson ? await response.json() : {}
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

  const isJson = response.headers.get('content-type')?.includes('application/json')
  if (!response.ok) {
    let msg = response.statusText
    if (isJson) {
      try {
        const error = await response.json()
        msg = error?.error || msg
      } catch {}
    }
    throw new Error(msg || 'Erro ao salvar distribuidor')
  }

  const result = isJson ? await response.json() : {}
  return result.distribuidor
}