import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { connectDB } from './config/db.js'
import menuRoutes from './routes/menu.js'
import ordersRoutes from './routes/orders.js'
import deliveryRoutes from './routes/delivery.js'
import paymentsRoutes from './routes/payments.js'

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: CORS_ORIGIN },
})

app.set('io', io)
app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/menu', menuRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/payments', paymentsRoutes)

// Manejador de errores: debe ir después de las rutas.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

io.on('connection', (socket) => {
  console.log('Panel conectado:', socket.id)
})

await connectDB()
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
