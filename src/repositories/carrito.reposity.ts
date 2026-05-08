import modelCarro from "../model/modelCarro"
import productSchema from '../model/modelProducto'

export const addItemToCarrito = async(productoId: Types.ObjectId, cantidad: number, userId:  Types.ObjectId) =>{
    try {
        const buscar_producto = await productSchema.findById(productoId)
        if(!buscar_producto) throw new Error("No hay productos")

        let carrito = await modelCarro.findOne({userId})

        //si no existe el carrito lo creamos
        if(!carrito){
            carrito = await modelCarro.create({
                userId,
                items: [],
                subtotal: 0,
                impuesto: 0,
                total: 0
            })
        }

        //buscamos para ver que existe
        const items = carrito.items.find(i => i.productoId.equals(productoId))
        if(!items){
            //si no existe
            carrito.items.push({
                productoId: buscar_producto._id,
                nombre: buscar_producto.nombre,
                imagen: buscar_producto.imagen,
                precio: buscar_producto.precio,
                cantidad,
                totalProducto: buscar_producto.precio * cantidad
            })
        }else{
            items.cantidad += cantidad
            items.totalProducto = items.precio * items.cantidad
        }

        carrito.subtotal = carrito.items.reduce((acc, i) => acc + i.totalProducto, 0);
        carrito.impuesto = carrito.subtotal * 0.154;
        carrito.total = carrito.subtotal + carrito.impuesto;
        //guardamos
        await carrito.save();

        return carrito
        
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const obtenerCarrito = async(userId:  Types.ObjectId)=>{
    try {
        if(!userId) throw new Error("No hay logueado")
        const carrito = await modelCarro.findOne({userId})

        return carrito
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const removeItemFromCarrito = async(productoId: Types.ObjectId, userId:  Types.ObjectId) =>{
    try {
        const buscar_producto = await productSchema.findById(productoId)
        if(!buscar_producto) throw new Error("No hay productos")

        let carrito = await modelCarro.findOne({userId})
         if(!carrito) throw new Error('No hay Carrito')

        //buscamos para ver que existe
        const items = carrito.items.find(i => i.productoId.equals(productoId))
        if(!items){
            throw new Error("No existe ningun producto en el carrito")
        }else{
            carrito.items = carrito.items.filter(i=> !i.productoId.equals(productoId))
        }

        carrito.subtotal = carrito.items.reduce((acc, i) => acc + i.totalProducto, 0);
        carrito.impuesto = carrito.subtotal * 0.154;
        carrito.total = carrito.subtotal + carrito.impuesto;

        await carrito.save();

        return carrito
        
    } catch (error) {
        console.error(error)
        throw error
    }
}
