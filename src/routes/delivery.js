import { Router } from 'express'
import { quoteDelivery } from '../utils/pricing.js'

const router = Router()

router.post('/quote', (req, res) => {
  const quote = quoteDelivery(req.body?.address)
  if (!quote) {
    return res.status(400).json({ error: 'Falta la dirección' })
  }
  res.json(quote)
})

export default router
