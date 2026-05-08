import { UserModel } from '../model/modelUser'
import {encriptarPassword, compararPassword} from '../service/password.service'

export const validarFunionesRegistro = async(  nombre: string, correo: string, password: string, role?: string)=>{
    //buscamos el usuario si exist o si ya esta registrado
    const buscandoUsuario = await UserModel.findOne({correo})
    
    if(buscandoUsuario) throw new Error("El usuario ya existe")

    const encriptar = await encriptarPassword(password)
    
    //creamos el usuario
    const usuario = await UserModel.create({
        nombre: nombre,
        correo: correo,
        password: encriptar,
        role: role
    })

    return usuario
}

export const validarFunionesLogin = async(correo: string, password: string)=>{
    //buscamos el usuario si exist o si ya esta registrado
    const buscandoUsuario = await UserModel.findOne({correo})
    
    if(!buscandoUsuario) throw new Error("El usuario no existe")

    const compararPas = await compararPassword(password, buscandoUsuario.password)

    if(!compararPas) throw new Error("Las contraseñas no coinciden")

    
    
    return buscandoUsuario
}

export const mostrandoDatos = async(id:string)=>{
    const usuarios = await UserModel.findById(id)
    return usuarios
}

export const mostrandoTodosUsuario = async()=>{
    const usuarios = await UserModel.find()
    return usuarios
}