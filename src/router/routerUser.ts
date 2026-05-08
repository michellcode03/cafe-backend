import Router from 'express'
import {registroUsuario, loginUsuario, mostrandoUser, mostrandoTodoUser, registrandoPanelAdmin} from '../controller/user.controller'
import {validateRegister, validacionLogin} from '../middlewares/auth_registro'
import {verificarAdmin } from '../middlewares/auth.producto'
import {verificarToken} from '../utils/token'
const routerUser: Router = Router()

routerUser.post('/login', validacionLogin, loginUsuario)
routerUser.post('/register', validateRegister,registroUsuario)
routerUser.get('/lista', mostrandoTodoUser)
routerUser.get('/perfil/:id', mostrandoUser)
routerUser.post('/admin',verificarToken,verificarAdmin,validateRegister, registrandoPanelAdmin )

export default routerUser

