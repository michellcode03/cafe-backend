import Router from 'express'
import { verificarToken } from '../utils/token'
import {validarDatosProducto, verificarAdmin} from '../middlewares/auth.producto'
import {agregarProducto, obtenerProducto, obtenerUsuarios} from '../controller/producto.controller'
const router_productos: Router = Router()
import { uploadProductImage } from '../middlewares/multer'

router_productos.post('/add', verificarToken, verificarAdmin, uploadProductImage.single('imagen'), validarDatosProducto, agregarProducto)
router_productos.get('/see', obtenerProducto)
router_productos.get('/usur', obtenerUsuarios)

export default router_productos

