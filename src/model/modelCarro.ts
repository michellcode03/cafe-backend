import mongoose, {Types, Schema, model} from "mongoose";

interface ItemCarrito {
  productoId: Types.ObjectId;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
  totalProducto: number;
}

interface Carrito {
  userId: Types.ObjectId;
  items: ItemCarrito[];
  subtotal: number;
  impuesto: number;
  total: number;
}

const carritoModel = new Schema<Carrito>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items:[
        {
            productoId: { 
                type: Schema.Types.ObjectId, 
                ref: 'Product', required: true 
            },
            cantidad: {
                type: Number, 
                default: 1 
            },
            nombre: { 
                type: String, 
                required: true 
            },   
            imagen: { 
                type: String, 
                required: true 
            } ,
            totalProducto:{
                type: Number,
                required: true
            },
            precio:{
                type: Number,
                required: true
            }
        }
    ],

    subtotal:{
        type: Number,
        required: true
    },
    impuesto:{
        type:Number,
        required: true
    },
    total:{
        type: Number,
        required:true
    }

})

export default model<Carrito>("Carro", carritoModel)