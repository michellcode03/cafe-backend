

import modelOrden from '../model/modelOrden'
import { UserModel } from '../model/modelUser'
import carritoModel from '../model/modelCarro'
import mongoose = require('mongoose')


export const crearOrden = async(userId: mongoose.Types.ObjectId)=>{
    try {
        const estado = "pagado" 
        const carrito = await carritoModel.findOne({ userId })
        if(!carrito) throw new Error("Carrito no encontrado para el usuario")
        
        const total = carrito.total

        const nuevaOrden = new modelOrden({
            userId,
            total,
            estado,
        })

       await nuevaOrden.save() 
       console.log("Orden creada:", nuevaOrden)

       //Limpiar
        await carritoModel.findOneAndUpdate(
            { userId },
            { items: [], subtotal: 0, impuesto: 0, total: 0 }
        )
       
       return nuevaOrden
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const obtenerOrdenesPorUsuario = async(userId: mongoose.Types.ObjectId)=>{
    try{
        const ordenes = await modelOrden.find({userId:userId}).select({total:1, estado:1, createdAt:1}).sort({createdAt:-1})
        return ordenes
    }catch(error){
        console.error(error)
        throw error
    }
}

//de orden
export const obtenerTotalVentas = async()=>{
    try{
        const resultado = await modelOrden.aggregate<any>([
            //filtrar como el where
            {$match: {estado: "pagado"}},
            //agrupar como group by
            {$group:{
                _id: null, //es decir que todos los datos
                totalVentas: {$sum: "$total"}
            }}
        ])

        return resultado[0].totalVentas || 0

    }catch(error){
        console.error(error)
        throw error
    }
}

// total de usuarios
export const obtenerTotalUsuarios = async()=>{
    try{
        //cuenta todas las collecction
        const totalUsuarios = await UserModel.countDocuments()
        return totalUsuarios
    }catch(error){
        console.error(error)
        throw error
    }
}

//total de ordenes
export const obtenerTotalOrdenes = async()=>{
    try{
        //cuenta todas las collecction
        const totalOrdenes = await modelOrden.countDocuments()
        return totalOrdenes
    }catch(error){
        console.error(error)
        throw error
    }
}

// total de ventas por semana y mes
export const obtenerTotalesMes = async()=>{
    try{
        const resultado = await modelOrden.aggregate<any>([
            //filtrar como el where
            {$match: {estado: "pagado"}},
            //agrupar como group by
            {$group:{
                _id: {mes: {$month: "$createdAt"}}, //mess
                totalVentas: {$sum: "$total"}
            }}
        ])

        return resultado[0].totalVentas || 0

    }catch(error){
        console.error(error)
        throw error
    }
}

export const obtenerTotalesSemana = async()=>{
    try{
        const resultado = await modelOrden.aggregate<any>([
            //filtrar como el where
            {$match: {estado: "pagado"}},
            //agrupar como group by
            {$group:{
                _id: {semana: {$week: "$createdAt"}}, //semana
                totalVentas: {$sum: "$total"}
            }}
        ])

        return resultado[0].totalVentas || 0

    }catch(error){
        console.error(error)
        throw error
    }
}