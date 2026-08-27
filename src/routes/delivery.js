import { Router } from 'express'

const router = Router()

// Cotización simulada de delivery. Cuando existan credenciales reales de
// Uber Direct, esto se reemplaza por una llamada a su API "Create Quote".
router.post('/quote', (req, res) => {
  const { address } = req.body
  if (!address || !address.trim()) {
    return res.status(400).json({ error: 'Falta la dirección' })
  }
  const fee = 2500 + (address.trim().length % 5) * 300
  const etaMin = 25 + (address.trim().length % 4) * 5
  res.json({ fee, etaMin, provider: 'uber_direct_mock' })
})

export default router
