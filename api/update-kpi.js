import Redis from 'ioredis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const redis = new Redis(process.env.REDIS_URL);
    await redis.set('kpi_data', JSON.stringify(req.body));
    await redis.quit();
    
    return res.status(200).json({ status: "Guardado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
