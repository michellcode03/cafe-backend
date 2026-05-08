import {addItemToCarrito, obtenerCarrito, removeItemFromCarrito} from '../repositories/carrito.reposity'
import {tokenLimpio} from  '../utils/token'

export const agregarCarrito = async(req:Request, res: Response)=>{
    const {productoId, cantidad} = req.body
    const userId = await tokenLimpio(req)

    try {
        if(!userId){
            return res.status(404).json({message: "No hay token"})
        }

        const carrito = await addItemToCarrito(productoId, cantidad, userId)
        res.status(201).json({message: "Carrito creado con exitoso",userId, carrito})

    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }
}

export const obteniendoCarrito = async(req:Request, res: Response)=>{
    const userId = await tokenLimpio(req)
    try {
        if(!userId){
            return res.status(404).json({message: "No hay token"})
        }

        const carrito = await obtenerCarrito(userId)

        res.status(201).json({message: "Mostrando Carrito exitoso",carrito})
    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }
}

export const eliminarCarrito = async(req:Request, res: Response)=>{
    const {productoId} = req.body
    const userId = await tokenLimpio(req)

    try {
        if(!userId){
            return res.status(404).json({message: "No hay token"})
        }

        const carrito = await removeItemFromCarrito(productoId, userId)
        res.status(200).json({message: "Carrito eliminado con exitoso",userId, carrito})

    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }
}