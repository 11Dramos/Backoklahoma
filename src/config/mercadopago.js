import { MercadoPagoConfig } from 'mercadopago'

let client = null

export function getMpClient() {
  if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error('Falta MP_ACCESS_TOKEN en las variables de entorno (.env)')
  }
  if (!client) {
    client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
  }
  return client
}
