import {tokenLimpio} from  '../utils/token'
import {addItemToFavorito, removeItemFromFavorito, findFavoritoByClienteId} from '../repositories/favorito.repository'

export const agregarAFavoritos = async(req:Request, res:Response):Promise<void>=>{
    const {productoId} = req.body
    const clienteId = await tokenLimpio(req)

    try {
        if(!clienteId) return res.status(404).json({message: "No hay token"})
        
        const favorito = await addItemToFavorito(productoId, clienteId)

        return res.status(201).json({message: "Favorito agregado correctamente", favorito})

        
    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }
}

export const obtenerFavoritos = async(req:Request, res:Response)=>{
    const clienteId = await tokenLimpio(req)

    try {
        if(!clienteId) return res.status(404).json({message: "No hay token"})

        const favorito_eliminar = await findFavoritoByClienteId(clienteId)

        return res.status(200).json({message: "Favorito eliminado correctamente", favorito_eliminar})


    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }

}

export const eliminarFavorito = async(req:Request, res:Response)=>{
    const {productoId } = req.body
    const clienteId = await tokenLimpio(req)
    console.log(productoId, clienteId)

    try {
        if(!clienteId) return res.status(404).json({message: "No hay token"})

        const favorito_eliminar = await removeItemFromFavorito(productoId, clienteId)
        console.log(productoId, clienteId)

        return res.status(200).json({message: "Favorito eliminado correctamente", favorito_eliminar})


    } catch (error) {
        return res.status(500).json({message: "Hay error en el sistema", error})
    }

}