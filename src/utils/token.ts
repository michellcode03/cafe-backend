import { Request } from 'express' 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenLimpio = async(req: Request): Promise<string | undefined> =>{
    //limpiamos el token, sin el BEAR
    const { authorization } = req.headers

    if(!authorization) return undefined

    //sacamos espacios vacios
    const token = authorization.split(" ")[1]

    //validamso que este bien
    if(!token) return undefined
 
    try {
        //mandamos el token -> el id el usuario y el secret
        const decodificado = jwt.verify(token, process.env.JWT_SECRET as string) as any
        //le mando solo el id de ese usuario
        return decodificado.id;
    } catch (error) {
        console.error("Token inválido o expirado");
        return undefined;
    }
}

export const verificarToken = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers

    if(!authorization) {
        res.status(401).json({message: "No hay token"})
        return
    }

    const token = authorization.split(" ")[1]

    if(!token) {
        res.status(401).json({message: "Token inválido"})
        return
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET as string) as any
        req.user = decodificado
        next()
    } catch (error) {
        res.status(401).json({message: "Token inválido o expirado"})
    }
}