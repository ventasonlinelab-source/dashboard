import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // Esto conecta directamente con tu REDIS_URL que ya tienes configurada
    const redis = Redis.fromEnv();
    
    // Guardamos los datos
    await redis.set('kpi_data', req.body);
    
    return res.status(200).json({ status: "Guardado en Redis correctamente" });
  } catch (error) {
    return res.status(500).json({ 
      error: "Error al conectar con Redis", 
      details: error.message 
    });
  }
}
