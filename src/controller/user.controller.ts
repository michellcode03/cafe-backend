import {generarToken} from '../service/generar.service'
import {validarFunionesRegistro, validarFunionesLogin, mostrandoDatos, mostrandoTodosUsuario} from '../repositories/auth.repository'
import {tokenLimpio} from '../utils/token'

export const registroUsuario = async(req: Request, res: Response):Promise<void>=>{
    console.log(req.body)
    const {nombre, correo, password} = req.body
    console.log(req.body)
    try {

        const usuario = await validarFunionesRegistro( nombre, correo, password)

        const payload = {
            id: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre
        }

        const token = generarToken(payload)

        if(!token){
            return res.status(404).json({message: "No hay token"})
        }

        res.status(200).json({message: "Registro exitoso",token, usuario})

    } catch (error) {
        return res.status(500).json({message: "Hay un error en el backend", error: error.message})
    }

}

export const loginUsuario = async(req: Request, res: Response):Promise<void>=>{
    console.log(req.body)
    const {correo, password} = req.body
    console.log(req.body)
    try {

        const usuario = await validarFunionesLogin(correo, password)

        const payload = {
            id: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre,
            role: usuario.role
        }

        const token = generarToken(payload)

        if(!token){
            return res.status(404).json({message: "No hay token"})
        }


        res.status(200).json({message: "Login exitoso",token, usuario})
        
    } catch (error) {
        return res.status(500).json({message: "Hay un error en el backend", error: error.message})
    }
}

export const registrandoPanelAdmin = async(req:Request,res:Response)=>{
    console.log(req.body)
    const {nombre, correo, password, role} = req.body
    console.log(req.body)
    try {

        const usuario = await validarFunionesRegistro( nombre, correo, password, role)

        const payload = {
            id: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre,
            role: usuario.role
        }

        const token = generarToken(payload)

        if(!token){
            return res.status(404).json({message: "No hay token"})
        }

        res.status(200).json({message: "Registro exitoso",token, usuario})

    } catch (error) {
        return res.status(500).json({message: "Hay un error en el backend", error: error.message})
    }
}

export const mostrandoUser = async(req:Request,res:Response)=>{
    const { id } = req.params
    const token = tokenLimpio(req);
    console.log(id)
    
    try {
        if(!token){
            return res.status(404).json({message: "No hay token"})
        }

        const usuarios = await mostrandoDatos(id) 
        res.status(200).json({message: "Perfil exitoso",token, usuarios})

    } catch (error) {
        return res.status(500).json({message: "Hay un error en el backend", error: error.message})
    }
}


export const mostrandoTodoUser = async(req:Request, res: Request)=>{
    const token = tokenLimpio(req); //verifica que el admin este logeados
    try{

        if(!token){
            return res.status(404).json({message: "No hay token"})
        }

        const usuarios = await mostrandoTodosUsuario() 
        res.status(200).json({message: "Lista de usuarios",token, usuarios})

    }catch(error){
        return res.status(500).json({message: "Hay un error en el backend", error: error.message})
    }
}
