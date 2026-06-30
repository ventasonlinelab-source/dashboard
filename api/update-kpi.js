// Selector: Código optimizado para Vercel + Upstash
import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Inicialización automática desde variables de entorno
    const redis = Redis.fromEnv();

    // Extraemos los datos
    const data = req.body.fields || req.body;

    // Guardado en Redis
    await redis.set('kpi_data', JSON.stringify(data));

    return res.status(200).json({ status: "Guardado correctamente", received: data });
  } catch (error) {
    console.error("Fallo crítico en API:", error);
    return res.status(500).json({ error: error.message });
  }
}
