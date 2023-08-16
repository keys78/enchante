import { Document, Schema, model } from 'mongoose';

interface Product {
  category: string;
  name: string;
  image: string;
  desc: string;
  sizes: string[];
  color: string;
  brand: string;
  price: number;
  cartQuantity: number;
}

export interface Order extends Document {
  userId: string;
  customerId: string;
  paymentIntentId: string;
  product: Product[];
  subTotal: number;
  total: number;
  shipping: object;
  delivery_status: string;
  payment_status: string;
}

const orderSchema = new Schema<Order>({
  userId: { type: String, required: true },
  customerId: { type: String},
  paymentIntentId: { type: String},
  product: [
    {
      category: { type: String },
      name: { type: String },
      image: { type: String },
      // desc: { type: String },
      // sizes: [{ type: String }],
      // color: { type: String },
      // brand: { type: String },
      // price: { type: Number },
      cartQuantity: { type: Number },
    },
  ],
  subTotal: { type: Number, required: true },
  total: { type: Number, required: true },
  shipping: { type: Object, required: true },
  delivery_status: { type: String, default: 'pending' },
  payment_status: { type: String, required: true },
}, { timestamps: true });

export default model<Order>('Order', orderSchema);
