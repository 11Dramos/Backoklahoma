import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { calcOrderTotals, quoteDelivery } from '../src/utils/pricing.js'

describe('quoteDelivery', () => {
  test('devuelve null si falta la dirección', () => {
    assert.equal(quoteDelivery(''), null)
    assert.equal(quoteDelivery('   '), null)
    assert.equal(quoteDelivery(undefined), null)
    assert.equal(quoteDelivery(123), null)
  })

  test('calcula tarifa y tiempo según el largo de la dirección', () => {
    // "Av. Siempre Viva 742" tiene 20 caracteres: 20 % 5 = 0 y 20 % 4 = 0
    assert.deepEqual(quoteDelivery('Av. Siempre Viva 742'), {
      fee: 2500,
      etaMin: 25,
      provider: 'uber_direct_mock',
    })
    // 7 caracteres: 7 % 5 = 2 y 7 % 4 = 3
    assert.deepEqual(quoteDelivery('Calle 1'), {
      fee: 3100,
      etaMin: 40,
      provider: 'uber_direct_mock',
    })
  })

  test('ignora los espacios al inicio y al final', () => {
    assert.deepEqual(quoteDelivery('  Calle 1  '), quoteDelivery('Calle 1'))
  })

  test('la tarifa siempre está entre $2.500 y $3.700', () => {
    for (let n = 1; n <= 40; n++) {
      const { fee } = quoteDelivery('x'.repeat(n))
      assert.ok(fee >= 2500 && fee <= 3700, `fee fuera de rango con ${n} caracteres: ${fee}`)
    }
  })
})

describe('calcOrderTotals', () => {
  const items = [
    { price: 3500, qty: 2 },
    { price: 1200, qty: 1 },
  ]

  test('suma subtotal y total sin delivery para retiro en local', () => {
    assert.deepEqual(calcOrderTotals(items, 'pickup', 2500), {
      subtotal: 8200,
      deliveryFee: 0,
      total: 8200,
    })
  })

  test('suma el costo de delivery cuando el pedido es a domicilio', () => {
    assert.deepEqual(calcOrderTotals(items, 'delivery', 2800), {
      subtotal: 8200,
      deliveryFee: 2800,
      total: 11000,
    })
  })

  test('trata un costo de delivery faltante como cero', () => {
    assert.equal(calcOrderTotals(items, 'delivery', undefined).total, 8200)
  })

  test('un pedido sin productos suma cero', () => {
    assert.deepEqual(calcOrderTotals([], 'pickup'), { subtotal: 0, deliveryFee: 0, total: 0 })
  })
})
