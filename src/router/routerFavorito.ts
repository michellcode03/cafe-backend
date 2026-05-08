import Router from 'express'
import {validarProductoId} from '../middlewares/auth_favorito'
import {agregarAFavoritos, obtenerFavoritos, eliminarFavorito} from '../controller/favorito.controller'
const router_favorito: Router = Router()

router_favorito.post('/add', validarProductoId, agregarAFavoritos)
router_favorito.delete('/delete', validarProductoId, eliminarFavorito)
router_favorito.get('/obtain', obtenerFavoritos)

export default router_favorito