import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // Esto utiliza automáticamente la variable REDIS_URL de Vercel
    const redis = Redis.fromEnv();
    
    // Guardamos el cuerpo de la petición en la clave 'kpi_data'
    await redis.set('kpi_data', req.body);
    
    return res.status(200).json({ status: "Guardado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
