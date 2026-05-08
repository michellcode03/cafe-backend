import Router from 'express'
import {agregarOrden, obtenerDashboard, obtenerOrdenesUsuario} from '../controller/orden.controller'
import {verificarToken} from '../utils/token'
import {verificarAdmin } from '../middlewares/auth.producto'
const router_orden: Router = Router()


router_orden.post('/obtain', verificarToken, agregarOrden)
router_orden.get('/user', verificarToken, obtenerOrdenesUsuario)
router_orden.get('/dashboard', verificarToken, verificarAdmin, obtenerDashboard)


export default router_orden