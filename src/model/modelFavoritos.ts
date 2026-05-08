import mongoose, {Types, model, Schema} from "mongoose";

interface ItemFavorito {
  productoId: Types.ObjectId;
  nombre: string;
  imagen: string;
  precio: number;
}

interface Favorito{
    clienteId: Types.ObjectId,
    items:ItemFavorito[];
}

const favoritoModel = new Schema<Favorito>({
    clienteId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items:[
        {
            productoId: { 
                type: Schema.Types.ObjectId, 
                ref: 'Producto', required: true 
            },
            nombre: { 
                type: String, 
                required: true 
            },   
            imagen: { 
                type: String, 
                required: true 
            },
            precio:{
                type: Number,
                required: true
            }
        }
    ],

})

export default model<Favorito>("Favorito", favoritoModel)