export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Esta URL ya contiene las credenciales
  const url = `${process.env.REDIS_URL}/set/kpi_data`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    return res.status(200).json({ status: "Guardado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
