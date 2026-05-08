import Router from 'express'
import {validarCarrito} from '../middlewares/auth_carro'
import {agregarCarrito, obteniendoCarrito, eliminarCarrito} from '../controller/carro.controller'
const router_carrito:Router = Router()

router_carrito.post('/add', validarCarrito, agregarCarrito)
router_carrito.get('/see', obteniendoCarrito)
router_carrito.delete('/delete', eliminarCarrito)

export default router_carrito