export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const url = `${process.env.REDIS_URL}/set/kpi_data`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REDIS_PASSWORD || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    return res.status(200).json({ status: "Guardado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
