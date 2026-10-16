import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import menuRoutes from './routes/menu.js'
import ordersRoutes from './routes/orders.js'
import deliveryRoutes from './routes/delivery.js'
import paymentsRoutes from './routes/payments.js'

// Construye la app sin arrancar el servidor ni conectar a la base de datos,
// para poder probarla en los tests del pipeline.
export function createApp() {
  // Admite uno o varios orígenes separados por coma (ej. front de clientes + panel de cocina).
  const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())

  const app = express()
  const httpServer = createServer(app)
  const io = new Server(httpServer, { cors: { origin: corsOrigins } })

  app.set('io', io)
  app.use(cors({ origin: corsOrigins }))
  app.use(express.json())

  app.get('/api/health', (req, res) => res.json({ ok: true }))
  app.use('/api/menu', menuRoutes)
  app.use('/api/orders', ordersRoutes)
  app.use('/api/delivery', deliveryRoutes)
  app.use('/api/payments', paymentsRoutes)

  // Sirve el build del front (si está presente) desde el mismo servidor.
  // El pipeline de despliegue a Azure copia el build de Vite en ./public.
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const publicDir = path.join(__dirname, '..', 'public')
  if (fs.existsSync(path.join(publicDir, 'index.html'))) {
    app.use(express.static(publicDir))
    app.get(/^(?!\/api\/).*/, (req, res) => {
      res.sendFile(path.join(publicDir, 'index.html'))
    })
  }

  // Manejador de errores: debe ir después de las rutas.
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  })

  io.on('connection', (socket) => {
    console.log('Panel conectado:', socket.id)
  })

  return { app, httpServer, io }
}
