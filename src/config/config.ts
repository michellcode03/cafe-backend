import mongoose from 'mongoose'
import dns from 'dns'

export const coneccionMongo = async() =>{
    const URL = process.env.URL_MONGO 
    try {

        if(!URL){
            console.log("Error al conectarce a Mongo")
            process.exit(1)
        }

        dns.setServers(['8.8.8.8', '8.8.4.4'])
       await mongoose.connect(URL as string)
       console.log("MongoDB conectado");

    } catch (error) {
        console.log("Error en la URL", error)
        process.exit(1)
    }
}