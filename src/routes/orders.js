import { Router } from 'express'
import Order, { ORDER_STATUSES } from '../models/Order.js'
import Product from '../models/Product.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })
    res.json(order)
  }),
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { items, fulfillment, schedule, customer, address, delivery, payment } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El pedido no tiene productos' })
    }
    if (!customer?.name || !customer?.phone) {
      return res.status(400).json({ error: 'Faltan los datos de contacto' })
    }
    if (fulfillment === 'delivery' && !address?.trim()) {
      return res.status(400).json({ error: 'Falta la dirección de entrega' })
    }

    // No confiamos en los precios que manda el cliente: los recalculamos
    // desde la base de datos para evitar que se manipule el total del pedido.
    const productIds = items.map((i) => i.productId)
    const products = await Product.find({ _id: { $in: productIds } })
    const productMap = new Map(products.map((p) => [String(p._id), p]))

    const missing = items.find((i) => !productMap.has(i.productId))
    if (missing) {
      return res.status(400).json({ error: `Producto no encontrado: ${missing.productId}` })
    }

    const orderItems = items.map((i) => {
      const product = productMap.get(i.productId)
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        qty: i.qty,
        note: i.note || '',
      }
    })

    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
    const deliveryFee = fulfillment === 'delivery' ? Number(delivery?.fee || 0) : 0
    const total = subtotal + deliveryFee

    // El pago con Mercado Pago se confirma después, vía webhook (ver
    // routes/payments.js). El de Webpay sigue simulado por ahora.
    const initialPaymentStatus = payment?.method === 'webpay' ? 'simulated_paid' : 'pending'

    const order = await Order.create({
      items: orderItems,
      fulfillment,
      schedule,
      customer,
      address: fulfillment === 'delivery' ? address : '',
      delivery: fulfillment === 'delivery' ? { ...delivery, fee: deliveryFee } : undefined,
      payment: { method: payment?.method, amount: total, status: initialPaymentStatus },
      subtotal,
      total,
    })

    req.app.get('io').emit('order:new', order)
    res.status(201).json(order)
  }),
)

router.patch(
  '/:id/status',
  asyncHandler(async (req, res) => {
    const { status } = req.body
    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' })
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })

    req.app.get('io').emit('order:updated', order)
    res.json(order)
  }),
)

export default router
