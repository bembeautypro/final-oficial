import { supabaseAdmin } from './_supabase.ts';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      nome, 
      email, 
      telefone, 
      empresa, 
      cidade, 
      estado, 
      experiencia_distribuicao, 
      mensagem 
    } = req.body;

    // Validação básica dos campos obrigatórios
    if (!nome || !email || !telefone || !cidade || !estado) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, email, telefone, cidade, estado' 
      });
    }

    const distribuidorData = {
      nome,
      email,
      telefone,
      empresa: empresa || null,
      cidade,
      estado,
      experiencia_distribuicao: experiencia_distribuicao || null,
      mensagem: mensagem || null,
      created_at: new Date().toISOString()
    };

    console.log('Inserting distribuidor:', distribuidorData);

    const { data, error } = await supabaseAdmin
      .from('distribuidores')
      .insert([distribuidorData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'Erro ao salvar aplicação distribuidor', 
        details: error.message 
      });
    }

    console.log('Distribuidor created:', data);
    return res.status(201).json({ 
      success: true, 
      data: data[0] 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor', 
      details: error.message 
    });
  }
}
