import { Router } from 'express'
import crypto from 'node:crypto'

const router = Router()

// Pago simulado. Cuando exista integración real con Webpay/Mercado Pago,
// esto se reemplaza por la llamada a su API de creación de transacción.
router.post('/simulate', (req, res) => {
  const { method, amount } = req.body
  if (!['webpay', 'mercadopago'].includes(method)) {
    return res.status(400).json({ error: 'Método de pago inválido' })
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Monto inválido' })
  }
  res.json({
    status: 'approved',
    transactionId: crypto.randomUUID(),
    method,
    amount,
  })
})

export default router
