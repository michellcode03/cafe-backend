import productSchema from '../model/modelProducto'
import userSchema from '../model/modelUser'

export const createProducto = async(imagenURL:String, nombre: String, descripcion: String, precio: Number, categoria: String, rating: Number, resenas:Number, estado: String, adminId: Types.ObjectId )=>{
    try {
        //creamos el producto
        const producto = await productSchema.create({
            adminId,
            imagen: imagenURL,
            nombre,
            descripcion,
            precio,
            categoria,
            rating,
            resenas,
            estado
        })
        
        return producto
        
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const mostrarProductos = async()=>{
    const productos = await productSchema.find()
    return productos
}


export const mostrarUsuarios = async()=>{
    const usuarios = await userSchema.find()
    return usuarios
}