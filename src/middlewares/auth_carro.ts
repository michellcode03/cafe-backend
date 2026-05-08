export const validarCarrito = (req: Request, res: Response, next: NextFunction) => {
    const { productoId, cantidad } = req.body

    if (!productoId) return res.status(400).json({ error: "No viene nada, esta vacio" })
    if (!cantidad || cantidad <= 0) return res.status(400).json({ error: "La cantidad es invalida" })

    next()
}