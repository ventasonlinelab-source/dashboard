import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  // 1. Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // 2. Conectamos con la base de datos
    const redis = Redis.fromEnv();

    // 3. Serializamos el body para asegurar compatibilidad total con Redis
    const data = req.body;
    await redis.set('kpi_data', JSON.stringify(data));

    return res.status(200).json({ status: "Guardado correctamente", received: data });
  } catch (error) {
    console.error("Error en ejecución de API:", error);
    return res.status(500).json({ error: error.message });
  }
}
