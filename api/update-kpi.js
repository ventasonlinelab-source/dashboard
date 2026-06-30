import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const redis = Redis.fromEnv();
    await redis.set('kpi_data', req.body);
    return res.status(200).json({ status: "Guardado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
