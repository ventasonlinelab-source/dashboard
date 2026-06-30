import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  // 1. Solo aceptamos peticiones POST (la que viene de n8n)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // 2. Conectamos con la base de datos usando la variable de entorno REDIS_URL
    const redis = Redis.fromEnv();
    
    // 3. Guardamos los datos que envía n8n
    const data = req.body;
    await redis.set('kpi_data', data);
    
    return res.status(200).json({ status: "Guardado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
