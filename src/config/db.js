import mongoose from 'mongoose'
import dns from 'node:dns'

// En algunos equipos Windows, el resolutor DNS del sistema (a veces una IP
// IPv6 link-local) hace fallar la búsqueda de registros SRV que usa
// "mongodb+srv://". Forzamos un DNS público para evitarlo.
dns.setServers(['8.8.8.8', '1.1.1.1'])

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Falta MONGODB_URI en las variables de entorno (.env)')
  }
  await mongoose.connect(uri)
  console.log('MongoDB conectado')
}
