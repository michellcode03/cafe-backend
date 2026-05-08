import mongoose, { Schema, model, Types } from "mongoose";

interface Producto {
  adminId: Types.ObjectId; // referencia al admin que creó el producto
  imagen: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Bebidas' | 'Comida' | 'Postres';
  rating: number;
  resenas: number;
  estado: 'normal' | 'nuevo' | 'bestseller' | 'oferta';
}

const productSchema = new Schema<Producto>({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, enum: ['Bebidas', 'Comida', 'Postres'], required: true },
  rating: { type: Number, default: 0 },
  resenas: { type: Number, default: 0 },
  estado: { type: String, enum: ['normal', 'nuevo', 'bestseller', 'oferta'], default: 'normal' },
}, 

{ timestamps: true }); // para createdAt y updatedAt

export default model<Producto>("Product", productSchema);