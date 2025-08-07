import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { name, email } = JSON.parse(req.body)
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email }])
      .single()

    if (error) throw error
    return res.status(200).json({ id: data.id })
  } catch (err) {
    console.error('❌ [/api/leads] Error:', err)
    return res.status(500).json({ error: err.message })
  }
}
