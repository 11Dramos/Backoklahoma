import 'dotenv/config'
import { connectDB } from './config/db.js'
import { createApp } from './app.js'

const PORT = process.env.PORT || 4000
const { httpServer } = createApp()

await connectDB()
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
