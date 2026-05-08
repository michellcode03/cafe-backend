export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, correo, password } = req.body;

  if (!nombre) throw new Error("Nombre vacío");
  if (!correo.includes("@")) throw new Error("Correo inválido");
  if (password.length < 8) throw new Error("Password muy corto");
  // if(!role) throw new Error("Por favor seleccione un rol")

  next();
};

export const validacionLogin = (req: Request, res: Response, next: NextFunction) => {
    const {correo, password} = req.body

    if(!correo.includes("@")) throw new Error("Correo invalido")
    if(!password) throw new Error("Datos vacios")
    // if(!role) throw new Error("Por favor seleccione un rol")

    next();
}