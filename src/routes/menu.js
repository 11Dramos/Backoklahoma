import { Router } from 'express'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const [categories, products] = await Promise.all([
      Category.find().sort({ order: 1 }),
      Product.find({ available: true }),
    ])
    res.json({ categories, products })
  }),
)

export default router
