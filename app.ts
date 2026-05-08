import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import {coneccionMongo} from './src/config/config'


const app = express()

//configuracion del json y las rutas
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

//router
import routerUser from './src/router/routerUser'
import router_favorito from "./src/router/routerFavorito"
import router_productos from "./src/router/routerProduct"
import router_carrito from "./src/router/routerCarro"
import router_orden from "./src/router/routerOrden"
app.use('/auth', routerUser)
app.use('/favorito', router_favorito)
app.use('/product', router_productos)
app.use('/shop', router_carrito)
app.use('/orden', router_orden)


//conectar base de datos
coneccionMongo()

export default app