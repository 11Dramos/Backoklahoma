// Logica de precios sin dependencias de Express ni de la base de datos,
// para poder probarla con pruebas unitarias.

// Cotizacion simulada de delivery. Cuando existan credenciales reales de
// Uber Direct, esto se reemplaza por una llamada a su API "Create Quote".
export function quoteDelivery(address) {
  if (typeof address !== 'string' || !address.trim()) return null
  const length = address.trim().length
  return {
    fee: 2500 + (length % 5) * 300,
    etaMin: 25 + (length % 4) * 5,
    provider: 'uber_direct_mock',
  }
}

// Calcula subtotal, costo de delivery y total a partir de los items ya
// validados contra la base de datos (no confiamos en los precios del cliente).
export function calcOrderTotals(orderItems, fulfillment, deliveryFee) {
  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const fee = fulfillment === 'delivery' ? Number(deliveryFee || 0) : 0
  return { subtotal, deliveryFee: fee, total: subtotal + fee }
}
