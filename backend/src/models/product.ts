import { Document, Schema, Types, model } from 'mongoose';

export interface Product extends Document {
  sellerId: Types.ObjectId['_id'];
  category: string;
  name: string;
  image: string;
  desc: string;
  sizes: string[];
  color: string;
  free_shipping: boolean;
  brand: string;
  price: number;
  new_product: boolean;
  discount: boolean;
  star_ratings: number;
}

const productSchema = new Schema<Product>({
  category: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  desc: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  color: { type: String, required: true },
  free_shipping: { type: Boolean, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  new_product: { type: Boolean, required: true },
  discount: { type: Boolean, required: true },
  star_ratings: { type: Number, required: true },
  sellerId: { type: Schema.Types.ObjectId }
});

export default model<Product>('Product', productSchema);