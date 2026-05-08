import mongoose, { Schema, model, Types } from "mongoose";

interface Usuario {
  nombre: string;
  correo: string;
  password: string;
  role: "user" | "admin";
}

const userSchema = new Schema<Usuario>({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], 
  default: "user" },
});

export const UserModel = model<Usuario>("User", userSchema);
