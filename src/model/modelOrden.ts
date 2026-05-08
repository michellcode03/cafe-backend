import { Schema, model, Types } from "mongoose";

interface Order {
  userId: Types.ObjectId;
  total: number;
  estado: "pagado" | "cancelado" | "pendiente";
}

const orderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    total: { type: Number, required: true },
    estado: { type: String, enum: ["pagado", "cancelado", "pendiente"], default: "pendiente" },
  },
  { timestamps: true }
);


export default model<Order>("Order", orderSchema);
