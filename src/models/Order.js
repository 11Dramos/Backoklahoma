import { Schema, model } from 'mongoose'

export const ORDER_STATUSES = [
  'received',
  'preparing',
  'ready',
  'out_for_delivery',
  'completed',
  'cancelled',
]

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    note: { type: String, default: '' },
  },
  { _id: false },
)

const orderSchema = new Schema(
  {
    items: { type: [orderItemSchema], required: true },
    fulfillment: { type: String, enum: ['delivery', 'pickup'], required: true },
    schedule: {
      mode: { type: String, enum: ['asap', 'schedule'], default: 'asap' },
      day: String,
      time: String,
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    address: { type: String, default: '' },
    delivery: {
      fee: { type: Number, default: 0 },
      etaMin: { type: Number, default: 0 },
      provider: { type: String, default: 'uber_direct_mock' },
    },
    payment: {
      method: { type: String, enum: ['webpay', 'mercadopago'], required: true },
      status: { type: String, default: 'pending' }, // pending | approved | rejected | simulated_paid
      amount: { type: Number, required: true },
      preferenceId: String,
      paymentId: String,
    },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ORDER_STATUSES, default: 'received' },
  },
  { timestamps: true },
)

export default model('Order', orderSchema)
