export async function submitLead(input: { nome:string; email:string; telefone:string }) {
  const payload = {
    nome: input.nome.trim(),
    email: input.email.trim().toLowerCase(),
    telefone: input.telefone.trim(),
  }
  
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { ok: false as const, error: data.error || 'Erro ao enviar dados' };
    }
    
    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, error: 'Erro de conexão' };
  }
}

export async function submitDistribuidor(input: { nome:string; email:string; telefone:string }) {
  const payload = {
    nome: input.nome.trim(),
    email: input.email.trim().toLowerCase(),
    telefone: input.telefone.trim(),
  }
  
  try {
    const response = await fetch('/api/distribuidores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { ok: false as const, error: data.error || 'Erro ao enviar dados' };
    }
    
    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, error: 'Erro de conexão' };
  }
}
