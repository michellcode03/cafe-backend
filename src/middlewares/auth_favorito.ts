
export const validarProductoId = (req:Request,res: Response, next: NextFunction)=>{
    const {productoId} = req.body

    if(!productoId){
        throw new Error("No viene nada del frontend, en sesion a favorito")
    }

    next()
}

