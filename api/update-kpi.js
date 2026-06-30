import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      // Guardamos el dato en la base de datos KV
      await kv.set('kpi_data', data);
      return res.status(200).json({ status: "Guardado correctamente", data });
    } catch (error) {
      return res.status(500).json({ error: "Fallo al escribir", details: error.message });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
