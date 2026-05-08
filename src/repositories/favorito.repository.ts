import modelFavoritos from '../model/modelFavoritos.js'
import productSchema from '../model/modelProducto.js'
import mongoose, { Types } from 'mongoose'

export const addItemToFavorito = async(productoId: Types.ObjectId, clienteId: Types.ObjectId) =>{
    try {
        const buscamos_producto = await productSchema.findById(productoId)

        if(!buscamos_producto){
            throw new Error("No hay productos")
        }

        //buscamos no existe el favorito
        let favorito = await modelFavoritos.findOne({clienteId})

        if(!favorito){
            favorito = await modelFavoritos.create({
                clienteId,
                items:[]
            })

        }

        const buscando_favorito = favorito.items.find(i=> i.productoId.equals(productoId))
        if(!buscando_favorito){
            favorito.items.push({
                productoId: buscamos_producto._id,
                nombre: buscamos_producto.nombre,
                imagen: buscamos_producto.imagen,
                precio: buscamos_producto.precio
            })
        }else{
            throw new Error("El favorito ya existe")
        }

        await favorito.save()

        return favorito

    } catch (error) {
        console.error(error)
        throw error

    }

}

export const removeItemFromFavorito = async(productoId: Types.ObjectId, clienteId: Types.ObjectId)=>{
    try {

        let favorito = await modelFavoritos.findOne({clienteId})
        if(!favorito) throw new Error('No hay favorito')
        console.log(favorito.items)

        const id = new Types.ObjectId(productoId)
        const buscando_favorito = favorito.items.find(i => i.productoId.equals(id))

        if(buscando_favorito){
            favorito.items = favorito.items.filter(i => !i.productoId.equals(id))
        }else{
            throw new Error("El favorito no existe")
        }

        await favorito.save()

        return favorito
        
    } catch (error) {
        console.error(error)
        throw error
    }

}

export const findFavoritoByClienteId = async(clienteId: Types.ObjectId)=>{
    const mostrardo_favorito = await modelFavoritos.findOne({clienteId})
    return mostrardo_favorito
}