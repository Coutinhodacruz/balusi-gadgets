import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  category: 'phones' | 'laptops' | 'accessories';
  brand: string;
  condition: 'new' | 'used';
  price: number;
  specs: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['phones', 'laptops', 'accessories'] },
    brand: { type: String, required: true },
    condition: { type: String, required: true, enum: ['new', 'used'] },
    price: { type: Number, required: true },
    specs: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
