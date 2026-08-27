import 'dotenv/config'
import { connectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { categories, products } from './menuData.js'
import mongoose from 'mongoose'

async function seed() {
  await connectDB()

  await Category.deleteMany({})
  await Product.deleteMany({})

  await Category.insertMany(categories)
  await Product.insertMany(products)

  console.log(`Sembrado: ${categories.length} categorías, ${products.length} productos`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Error al sembrar la base de datos:', err)
  process.exit(1)
})
