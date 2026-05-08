import {createProducto, mostrarProductos, mostrarUsuarios, buscarProductoPorNombre} from '../repositories/producto.reposity'

export const agregarProducto = async(req:Request, res:Response):Promise<void>=>{
     console.log(req.body)
    const { nombre, descripcion, precio, categoria, rating, resenas, estado } = req.body
    const adminId = req.user.id
    console.log(req.body)

    try {
        const imagenURL  = `/uploads/producto/${req.file.filename}`

        const productos = await createProducto(imagenURL, nombre, descripcion, precio, categoria, rating, resenas, estado, adminId)

        return res.status(201).json({message: "Producto agregado correctamente", productos})
    } catch (error) {
            return res.status(500).json({message: "Hay error en el sistema", error})
    }

}


export const obtenerProducto = async(req: Request, res:Response)=>{
    try {
        console.log('llegó a obtenerProducto')
        const producto = await mostrarProductos()
        console.log(producto)

        res.status(200).json({message: "Productos mostrados exitosamente",producto})

    } catch (error) {
        console.log('Error:', error.message)
        return res.status(500).json({message: "Hay error en el sistema", error})
    }

}

export const obtenerUsuarios = async(res:Response)=>{
    try {
        const usuarios = await mostrarUsuarios()

        res.status(200).json({message: "Productos mostrados exitosamente",usuarios})

    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }
}

