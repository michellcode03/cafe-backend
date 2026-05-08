import {crearOrden, obtenerTotalVentas, obtenerTotalUsuarios, obtenerTotalOrdenes, obtenerTotalesMes, obtenerTotalesSemana, obtenerOrdenesPorUsuario} from '../repositories/orden_repository'

export const agregarOrden = async(req:Request, res:Response):Promise<void>=>{
    const userId = req.user.id;
        
     try {

        const orden = await crearOrden(userId)

        return res.status(201).json({message: "Orden creada correctamente", orden})
        
     } catch (e) {
        return res.status(500).json({message: "Hay error en el sistema", e})
     }

}

export const obtenerOrdenesUsuario = async(req:Request, res:Response):Promise<void>=>{
    const userId = req.user.id;

    try{
        const ordenes = await obtenerOrdenesPorUsuario(userId)
        return res.status(200).json({message: "Ordenes obtenidas correctamente", ordenes})
    }catch(e){
        return res.status(500).json({message: "Hay error en el sistema", e})
    }
}

export const obtenerDashboard = async(req:Request, res:Response):Promise<void>=>{
   try{
      const [totalVentas, totalUsuarios, totalOrdenes, totalesMes, totalesSemana] = await Promise.all([
      obtenerTotalVentas(),
      obtenerTotalUsuarios(),
      obtenerTotalOrdenes(),
      obtenerTotalesMes(),
      obtenerTotalesSemana()
   ])
   
      return res.status(200).json({
         totalVentas,
         totalUsuarios,
         totalOrdenes,
         totalesMes,
         totalesSemana
      })

   }catch(e){
      return res.status(500).json({message: "Error al obtener el dashboard", e})
   }
}