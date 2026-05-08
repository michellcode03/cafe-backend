export const validarDatosProducto = (req: Request, res: Response, next: NextFunction) => {
    const { nombre, descripcion, precio, categoria, rating, resenas, estado } = req.body

    if (!nombre) return res.status(400).json({ error: "Nombre del producto vacio" })
    if (!precio || precio <= 0) return res.status(400).json({ error: "Hay un error en el precio" })
    if (!descripcion) return res.status(400).json({ error: "Los datos estan vacios" })
    if (!categoria) return res.status(400).json({ error: "Elija una categoria" })
    if (!rating || rating < 0) return res.status(400).json({ error: "Rating invalido" })
    if (!resenas || resenas < 0) return res.status(400).json({ error: "Reseñas invalidas" })
    if (!estado) return res.status(400).json({ error: "Elija un estado" })
    if (!req.file) return res.status(400).json({ error: "Imagen vacia" })

    next()
}

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log("req.user:", req.user)
    if (!req.user) return res.status(401).json({ error: "No hay usuario logueado" })
    if (req.user.role !== "admin") return res.status(403).json({ error: "No tienes permisos de admin" })

    next()
}