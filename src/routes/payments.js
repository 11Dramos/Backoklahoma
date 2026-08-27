import { Router } from 'express'
import crypto from 'node:crypto'
import { Preference, Payment } from 'mercadopago'
import { getMpClient } from '../config/mercadopago.js'
import Order from '../models/Order.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

// Pago simulado, usado solo mientras Webpay no está integrado de verdad.
router.post('/simulate', (req, res) => {
  const { method, amount } = req.body
  if (method !== 'webpay') {
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

// Crea una preferencia de pago real en Mercado Pago (Checkout Pro) para un
// pedido ya guardado, y devuelve la URL a la que hay que redirigir al cliente.
router.post(
  '/mercadopago/preference',
  asyncHandler(async (req, res) => {
    const { orderId } = req.body
    const order = await Order.findById(orderId)
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })

    const frontendUrl = process.env.FRONTEND_URL
    const backendUrl = process.env.BACKEND_URL
    if (!frontendUrl || !backendUrl) {
      return res.status(500).json({ error: 'Falta FRONTEND_URL o BACKEND_URL en el servidor' })
    }

    const preference = new Preference(getMpClient())
    const result = await preference.create({
      body: {
        items: [
          {
            title: `Pedido Oklahoma Burgers & Ribs #${order._id.toString().slice(-6)}`,
            quantity: 1,
            unit_price: order.total,
            currency_id: 'CLP',
          },
        ],
        external_reference: String(order._id),
        back_urls: {
          success: `${frontendUrl}/pago/exito?orderId=${order._id}`,
          failure: `${frontendUrl}/pago/error?orderId=${order._id}`,
          pending: `${frontendUrl}/pago/pendiente?orderId=${order._id}`,
        },
        auto_return: 'approved',
        notification_url: `${backendUrl}/api/payments/mercadopago/webhook`,
      },
    })

    order.payment.preferenceId = result.id
    await order.save()

    res.json({ init_point: result.init_point })
  }),
)

// Mercado Pago llama esta URL cuando el estado de un pago cambia.
router.post(
  '/mercadopago/webhook',
  asyncHandler(async (req, res) => {
    const paymentId = req.body?.data?.id || req.query['data.id'] || req.query.id
    const type = req.body?.type || req.query.topic

    if (type !== 'payment' || !paymentId) {
      return res.sendStatus(200) // otros tipos de eventos: los ignoramos
    }

    const payment = new Payment(getMpClient())
    const info = await payment.get({ id: paymentId })

    const order = await Order.findById(info.external_reference)
    if (order) {
      order.payment.status = info.status // approved | rejected | pending | in_process
      order.payment.paymentId = String(paymentId)
      await order.save()
      req.app.get('io').emit('order:updated', order)
    }

    res.sendStatus(200)
  }),
)

export default router
