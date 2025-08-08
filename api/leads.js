import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  const { nome, email, telefone, cidade, estado } = req.body

  const { data, error } = await supabase
    .from('leads')
    .insert([{ nome, email, telefone, cidade, estado }])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true, data })
}
