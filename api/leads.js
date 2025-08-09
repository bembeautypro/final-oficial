import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl ? 'CONFIGURED' : 'MISSING');
console.log('Supabase Key:', supabaseKey ? 'CONFIGURED' : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseKey);

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
    const { nome, email, telefone, tipoEstabelecimento } = req.body;

    if (!nome || !email || !telefone) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, email, telefone' 
      });
    }

    const leadData = {
      nome,
      email,
      telefone,
      tipo_estabelecimento: tipoEstabelecimento,
      user_agent: req.headers['user-agent'] || '',
      ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress || '',
      created_at: new Date().toISOString()
    };

    console.log('Inserting lead:', leadData);

    const { data, error } = await supabase
      .from('leads_nivela')
      .insert([leadData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Erro ao salvar lead', details: error.message });
    }

    console.log('Lead created:', data);
    return res.status(201).json({ 
      success: true, 
      lead: data[0] 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
