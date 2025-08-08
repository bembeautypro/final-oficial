import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

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
      mensagem, 
      cidade, 
      estado, 
      experiencia_distribuicao 
    } = req.body;

    if (!nome || !email || !telefone || !cidade || !estado) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, email, telefone, cidade, estado' 
      });
    }

    const distributorData = {
      nome,
      email,
      telefone,
      empresa: empresa || null,
      mensagem: mensagem || null,
      cidade,
      estado,
      experiencia_distribuicao: experiencia_distribuicao || 'nao',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('distribuidores')
      .insert([distributorData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Erro ao salvar distribuidor' });
    }

    return res.status(201).json({ 
      success: true, 
      distribuidor: data[0] 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}