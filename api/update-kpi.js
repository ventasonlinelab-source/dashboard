// Selector
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Extraemos los datos: si viene anidado en 'fields' (de n8n) lo tomamos, si no, el body entero
    const data = req.body.fields || req.body;
    
    // Guardamos en Redis como un JSON stringificado para mantener integridad
    await redis.set('KPI_data', JSON.stringify(data));

    return res.status(200).json({ status: "Guardado correctamente", data });
  } catch (error) {
    // Logueamos el error real en la consola de tu plataforma (Vercel/etc)
    console.error("Fallo crítico en API:", error);
    return res.status(500).json({ error: error.message });
  }
}
