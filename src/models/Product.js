import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  category: { type: String, required: true }, // key de Category, ej. 'hamburguesas'
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  available: { type: Boolean, default: true },
})

export default model('Product', productSchema)
