export default async function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({ status: "recibido" });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
