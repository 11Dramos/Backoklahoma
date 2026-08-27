import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  key: { type: String, required: true, unique: true }, // ej. 'hamburguesas'
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
})

export default model('Category', categorySchema)
