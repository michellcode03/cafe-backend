import bcryptjs from 'bcryptjs'

const SALTO = 10

export const encriptarPassword = async(password: string):Promise<string>=>{
    try {
    return await bcryptjs.hash(password, SALTO)
  } catch (error) {
    throw new Error("Error al encriptar contraseña")
  }
}

export const compararPassword = async(passwordAnterior:string, passwordReciente: string):Promise<boolean>=>{
    try {
        return await bcryptjs.compare(passwordAnterior, passwordReciente)
    } catch (error) {
        console.error(error)
        return false
    }

}